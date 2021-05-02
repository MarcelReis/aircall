import React from "react";
import {
  Box,
  CallInboundFilled,
  CallOutboundFilled,
  Flex,
  Icon,
  Typography,
  VoicemailOutlined,
} from "@aircall/tractor";
import parsePhoneNumber from "libphonenumber-js";
import dayjs from "dayjs";

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
  const IconComponent =
    props.call_type === "voicemail"
      ? VoicemailOutlined
      : props.direction === "inbound"
      ? CallInboundFilled
      : CallOutboundFilled;

  const iconColor =
    props.call_type === "voicemail"
      ? "grey.dark"
      : props.call_type === "missed"
      ? "red.base"
      : "green.base";

  return (
    <Flex
      boxShadow={1}
      borderRadius={8}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box padding="16px 0 16px 16px">
        <Icon component={IconComponent} size={32} color={iconColor} />
        <Typography fontSize="0px" height="0px">
          {props.call_type === "voicemail"
            ? props.call_type
            : `${props.call_type} call`}
        </Typography>
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
