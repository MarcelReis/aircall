import { InMemoryCache } from "@apollo/client";

export const createCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          paginatedCalls: {
            keyArgs: ["id"],
            merge(existing: any, incoming) {
              if (!existing) {
                return incoming;
              }
              return {
                ...incoming,
                nodes: [...existing.nodes, ...incoming.nodes],
              };
            },
          },
        },
      },
    },
  });
