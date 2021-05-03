import React, { ComponentType, SVGProps } from "react";
import { Flex, IconButton } from "@aircall/tractor";
import { useRouteMatch, Link } from "react-router-dom";

type MenuButtonProps = {
  to: string;
  component: string | ComponentType<SVGProps<SVGSVGElement>>;
};

const MenuButton = (props: MenuButtonProps) => {
  const isActive = useRouteMatch(props.to);

  return (
    <Flex width="100%" height="100%">
      <Link
        to={props.to}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          component={props.component}
          color={isActive ? "primary.base" : "secondary.light"}
          size={32}
        />
      </Link>
    </Flex>
  );
};

export default MenuButton;
