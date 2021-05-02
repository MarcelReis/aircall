import React from "react";
import { useParams } from "react-router-dom";
import { useCallInfoQuery } from "../generated/graphql";
import { parsePhoneNumber } from "libphonenumber-js";
import {
  Box,
  Spacer,
  Typography,
  CalendarOutlined,
  Tag,
  Flex,
  IconButton,
  MenuVerticalFilled,
} from "@aircall/tractor";
import dayjs from "dayjs";
import CallIcon from "../components/CallIcon";

const CallPage = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useCallInfoQuery({ variables: { id } });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error || !data || !data.call) {
    return <div>Error</div>;
  }

  const number =
    data.call.direction === "inbound" ? data.call.from : data.call.to;

  return (
    <Flex paddingTop={8} flexDirection="column">
      <Tag variant="grey" margin="auto" marginBottom={6}>
        <CalendarOutlined size={16} />
        <Typography>
          {dayjs(data.call.created_at).format("MMM, D YYYY hh:mm A")}
        </Typography>
      </Tag>

      <Box position="absolute" top={4} right={4}>
        <IconButton component={MenuVerticalFilled} size={24} />
      </Box>

      <Typography variant="displayM" textAlign="center" marginBottom={4}>
        {parsePhoneNumber(number).formatInternational()}
      </Typography>

      <Flex
        marginBottom={6}
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

      <Spacer space="xs" direction="vertical" marginBottom={4}>
        <Typography textAlign="center">
          From: {parsePhoneNumber(data.call.from).formatInternational()}
        </Typography>
        <Typography textAlign="center">
          Via: {parsePhoneNumber(data.call.via).formatInternational()}
        </Typography>
      </Spacer>

      <Spacer direction="vertical" width="100%" paddingX={4}>
        <Typography variant="displayS" marginBottom={3}>
          Notes
        </Typography>

        <Spacer space="s" direction="vertical" width="100%">
          {data.call.notes.map((note) => (
            <Box padding="16px" boxShadow={1} borderRadius={4}>
              <Typography key={note.id}>{note.content}</Typography>
            </Box>
          ))}
        </Spacer>
      </Spacer>
    </Flex>
  );
};

export default CallPage;
