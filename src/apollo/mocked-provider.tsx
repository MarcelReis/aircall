import React, { ComponentProps } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { createCache } from "./cache";

const createMockedProvider = (props: ComponentProps<typeof MockedProvider>) => {
  const cache = createCache();

  return () => <MockedProvider addTypename={false} cache={cache} {...props} />;
};

export default createMockedProvider;
