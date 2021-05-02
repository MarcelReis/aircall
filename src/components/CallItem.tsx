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
  number: string;
  direction: string;
  callType: string;
  createdAt: string;
};

const CallItem = (props: CallItemProps) => {
  const IconComponent =
    props.callType === "voicemail"
      ? VoicemailOutlined
      : props.direction === "inbound"
      ? CallInboundFilled
      : CallOutboundFilled;

  const iconColor =
    props.callType === "voicemail"
      ? "grey.dark"
      : props.callType === "missed"
      ? "red.base"
      : "green.base";

  return (
    <Flex
      boxShadow={1}
      borderRadius={8}
      padding="16px"
      width="100%"
      justifyContent="space-between"
    >
      <Box>
        <Icon component={IconComponent} size={32} color={iconColor} />
        <Typography fontSize="0px" height="0px">
          {props.callType === "voicemail"
            ? props.callType
            : `${props.callType} call`}
        </Typography>
      </Box>

      <Box margin="auto">
        <Typography>
          {parsePhoneNumber(props.number)!.formatInternational()}
        </Typography>
      </Box>

      <div>{dayjs(props.createdAt).format("hh:mm A")}</div>
    </Flex>
  );
};

export default CallItem;
