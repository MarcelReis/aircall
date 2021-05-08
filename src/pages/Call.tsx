import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useArchiveCallMutation,
  useAddNoteMutation,
  useCallInfoQuery,
} from "../generated/graphql";
import { parsePhoneNumber } from "libphonenumber-js";
import {
  Box,
  Spacer,
  Typography,
  CalendarOutlined,
  Tag,
  Button,
  ArchiveFilled,
  TextFieldInput,
  ClockOutlined,
  Flex,
  CloseOutlined,
  MenuVerticalFilled,
  DropdownButton,
  Dropdown,
  MenuItem,
  Menu,
  Form,
} from "@aircall/tractor";
import dayjs from "dayjs";
import CallIcon from "../components/CallIcon";

const CallPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useCallInfoQuery({ variables: { id } });
  const [newNote, setNewNote] = useState("");
  const [archiveCallMutation] = useArchiveCallMutation();
  const [addNoteMutation, addNoteResult] = useAddNoteMutation();

  if (loading) {
    return <div>Loading</div>;
  }

  if (error || !data || !data.call) {
    return <div>Error</div>;
  }

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (addNoteResult.loading) {
      return;
    }

    const input = { content: newNote, activityId: id };

    addNoteMutation({ variables: { input } })
      .then(() => setNewNote(""))
      .catch(console.error);
  };

  const archiveCall = () => {
    archiveCallMutation({ variables: { id } }).catch(console.error);
  };

  const number =
    data.call.direction === "inbound" ? data.call.from : data.call.to;

  return (
    <Flex paddingTop={8} flexDirection="column">
      {data.call.is_archived && (
        <Box position="absolute" top={4} left={4}>
          <Tag size="small" variant="grey">
            Archived
          </Tag>
        </Box>
      )}

      <Box position="absolute" top={4} right={4}>
        <Dropdown
          trigger={
            <DropdownButton
              mode="link"
              variant="primary"
              aria-label="Call options"
              iconOpen={<CloseOutlined />}
              iconClose={<MenuVerticalFilled />}
            />
          }
          position="bottom"
          anchor="end"
        >
          <Menu>
            <MenuItem onClick={archiveCall}>
              <ArchiveFilled /> {data.call.is_archived ? "Restore" : "Archive"}
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>

      <Tag variant="grey" margin="auto" marginBottom={6}>
        <CalendarOutlined size={16} />
        <Typography>
          {dayjs(data.call.created_at).format("MMM, D YYYY hh:mm A")}
        </Typography>
      </Tag>

      <Typography variant="displayM" textAlign="center" marginBottom={4}>
        {parsePhoneNumber(number).formatInternational()}
      </Typography>

      <Flex
        position="relative"
        top={2}
        size={64}
        borderRadius="50%"
        backgroundColor="grey.light"
        justifyContent="center"
        alignItems="center"
        marginX="auto"
      >
        <CallIcon
          size={48}
          call_type={data.call.call_type}
          direction={data.call.direction}
        />
      </Flex>

      {data.call.call_type !== "missed" ? (
        <Box zIndex={1} margin="auto">
          <Tag
            size="small"
            backgroundColor="#666"
            color="#fff"
            marginBottom={6}
          >
            <ClockOutlined size={16} />
            <Typography>
              {dayjs(data.call.duration).format("HH:MM:ss")}
            </Typography>
          </Tag>
        </Box>
      ) : (
        <Box height="24px" marginBottom={6} />
      )}

      <Spacer space="xs" direction="vertical" marginBottom={4}>
        <Typography textAlign="center">
          From: {parsePhoneNumber(data.call.from).formatInternational()}
        </Typography>
        <Typography textAlign="center">
          Via: {parsePhoneNumber(data.call.via).formatInternational()}
        </Typography>
      </Spacer>

      <Spacer
        space="l"
        direction="vertical"
        width="100%"
        paddingX={4}
        paddingBottom={2}
      >
        <Typography variant="displayS">Notes</Typography>

        <Spacer space="s" direction="vertical" width="100%">
          {data.call.notes.map((note) => (
            <Box key={note.id} padding="16px" boxShadow={1} borderRadius={4}>
              <Typography>{note.content}</Typography>
            </Box>
          ))}
        </Spacer>

        <Form onSubmit={addNote}>
          <Spacer direction="vertical" space={4} width="100%">
            <TextFieldInput
              onChange={({ target: { value } }) => setNewNote(value)}
              value={newNote}
              placeholder="Write something here"
              aria-label="Note content"
            />

            <Button block disabled={addNoteResult.loading} type="submit">
              Add Note
            </Button>
          </Spacer>
        </Form>
      </Spacer>
    </Flex>
  );
};

export default CallPage;
