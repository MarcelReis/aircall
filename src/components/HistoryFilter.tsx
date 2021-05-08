import React from "react";
import {
  Box,
  Dropdown,
  DropdownButton,
  Menu,
  MenuItem,
  PreferencesOutlined,
} from "@aircall/tractor";

type HistoryFilterProps = {
  toggleFilter: (payload: { type?: string; direction?: string }) => void;
  filters: { direction: string[]; type: string[] };
};

const HistoryFilter = (props: HistoryFilterProps) => {
  return (
    <Dropdown
      trigger={
        <DropdownButton
          mode="link"
          variant="primary"
          iconClose={<PreferencesOutlined />}
        >
          Filters
        </DropdownButton>
      }
      position="bottom"
      anchor="end"
    >
      <Menu>
        <MenuItem onClick={() => props.toggleFilter({ type: "voicemail" })}>
          {props.filters.type.includes("voicemail") ? "✔ " : null}Voicemail
        </MenuItem>
        <MenuItem onClick={() => props.toggleFilter({ type: "answered" })}>
          {props.filters.type.includes("answered") ? "✔ " : null}Answered
        </MenuItem>
        <MenuItem onClick={() => props.toggleFilter({ type: "missed" })}>
          {props.filters.type.includes("missed") ? "✔ " : null}Missed
        </MenuItem>

        <Box
          width="100%"
          borderWidth={2}
          borderStyle="solid"
          borderColor="grey.lighter"
        />

        <MenuItem onClick={() => props.toggleFilter({ direction: "inbound" })}>
          {props.filters.direction.includes("inbound") ? "✔ " : null}Inbound
        </MenuItem>
        <MenuItem onClick={() => props.toggleFilter({ direction: "outbound" })}>
          {props.filters.direction.includes("outbound") ? "✔ " : null}Outbound
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default HistoryFilter;
