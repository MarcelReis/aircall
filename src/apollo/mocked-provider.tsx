import React, { ComponentProps } from "react";
import { MockedProvider as Provider } from "@apollo/client/testing";
import { createCache } from "./cache";

const MockedProvider = (props: ComponentProps<typeof Provider>) => {
  const cache = createCache();

  return <Provider cache={cache} {...props} />;
};

export default MockedProvider;
