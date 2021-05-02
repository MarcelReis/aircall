import { ApolloClient } from "@apollo/client";
import { createCache } from "./cache";
import { link } from "./link";

export const cache = createCache();

export const createClient = () => new ApolloClient({ link, cache });
