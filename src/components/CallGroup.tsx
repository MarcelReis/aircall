import React, { ComponentProps } from "react";
import CallItem from "./CallItem";
import { Box, Spacer, Typography } from "@aircall/tractor";

type CallGroupProps = {
  header: string;
  calls: ComponentProps<typeof CallItem>[];
};

const CallGroup = (props: CallGroupProps) => {
  return (
    <Box>
      <Typography variant="heading" marginBottom={2} paddingX={4}>
        {props.header}
      </Typography>

      <Spacer space="xs" direction="vertical" width="100%" padding="0 16px">
        {props.calls.map((call) => (
          <CallItem {...call} key={call.id} />
        ))}
      </Spacer>
    </Box>
  );
};

export default CallGroup;
