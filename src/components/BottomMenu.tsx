import React from "react";
import {
  Avatar,
  Box,
  Grid,
  HistoryOutlined,
  KeypadOutlined,
  PeopleOutlined,
  ToDoOutlined,
} from "@aircall/tractor";
import MenuButton from "./MenuButton";

const profilePic = `https://randomuser.me/api/portraits/men/${Math.round(
  Math.random() * 100
)}.jpg`;

function BottomMenu() {
  return (
    <Box
      position="fixed"
      bg="#fff"
      width="100%"
      height="72px"
      boxShadow={1}
      bottom={0}
      left={0}
    >
      <Grid
        maxWidth="600px"
        height="100%"
        alignItems="center"
        justifyItems="center"
        margin="auto"
        gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
      >
        <MenuButton to={"/todo"} component={ToDoOutlined} />
        <MenuButton to={"/history"} component={HistoryOutlined} />
        <MenuButton to={"/dial"} component={KeypadOutlined} />
        <MenuButton to={"/contacts"} component={PeopleOutlined} />

        <Avatar size="medium" src={profilePic}>
          MR
        </Avatar>
      </Grid>
    </Box>
  );
}

export default BottomMenu;
