import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Typography } from "@aircall/tractor";
import parsePhoneNumber from "libphonenumber-js";
import dayjs from "dayjs";
import CallIcon from "./CallIcon";

type CallItemProps = {
  id: string;
  call_type: "voicemail" | "missed" | "answered";
  created_at: string;
  direction: "inbound" | "outbound";
  from: string;
  is_archived: true;
  to: string;
};

const CallItem = (props: CallItemProps) => {
  const history = useHistory();

  return (
    <Flex
      boxShadow={1}
      borderRadius={8}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      onClick={() => history.push(`/history/${props.id}`)}
    >
      <Box padding="16px 0 16px 16px">
        <CallIcon
          size={32}
          call_type={props.call_type}
          direction={props.direction}
        />
      </Box>

      <Box padding="16px 0" margin="auto">
        <Typography>
          {parsePhoneNumber(
            props.direction === "inbound" ? props.from : props.to
          )!.formatInternational()}
        </Typography>
      </Box>

      <Box
        borderLeft="2px solid"
        borderColor="grey.light"
        height="100%"
        padding="12px 16px 12px 0"
      >
        <Typography variant="body" paddingLeft={4}>
          {dayjs(props.created_at).format("hh:mm A")}
        </Typography>
      </Box>
    </Flex>
  );
};

export default CallItem;
