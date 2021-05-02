import React from "react";
import {
  Box,
  InboundOutlined,
  OutboundOutlined,
  Icon,
  Typography,
  VoicemailOutlined,
} from "@aircall/tractor";

type CallIconProps = {
  size: number;
  call_type: string;
  direction: string;
};

const CallIcon = (props: CallIconProps) => {
  const IconComponent =
    props.call_type === "voicemail"
      ? VoicemailOutlined
      : props.direction === "inbound"
      ? InboundOutlined
      : OutboundOutlined;

  const iconColor =
    props.call_type === "voicemail"
      ? "grey.dark"
      : props.call_type === "missed"
      ? "red.base"
      : "green.base";

  return (
    <Box>
      <Icon component={IconComponent} size={props.size} color={iconColor} />
      <Typography fontSize="0px" height="0px">
        {props.call_type === "voicemail"
          ? props.call_type
          : `${props.call_type} call`}
      </Typography>
    </Box>
  );
};

export default CallIcon;
