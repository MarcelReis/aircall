import React, { useMemo, useState } from "react";
import { Box, Button, Spacer, Typography } from "@aircall/tractor";

import { useCallListQuery } from "../generated/graphql";
import dayjs from "dayjs";
import CallGroup from "../components/CallGroup";

const LIMIT = 10;

const HomePage = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    loading: false,
  });

  const { data, error, loading, fetchMore } = useCallListQuery({
    variables: { offset: 0, limit: LIMIT },
  });

  const loadMore = async () => {
    setPagination((pagination) => {
      fetchMore({
        variables: { offset: pagination.page * LIMIT, limit: LIMIT },
      })
        .then(() =>
          setPagination((pagination) => ({
            ...pagination,
            page: pagination.page + 1,
          }))
        )
        .catch(console.log)
        .finally(() =>
          setPagination((pagination) => ({ ...pagination, loading: false }))
        );

      return { ...pagination, loading: true };
    });
  };

  const groupedCalls = useMemo(() => {
    if (!data?.paginatedCalls.nodes?.length) {
      return [];
    }

    const calls = [...data.paginatedCalls.nodes];
    calls.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

    return calls.reduce((groupedCalls: any, call) => {
      const header = dayjs(call.created_at).format("MMMM, D YYYY");

      const previous = groupedCalls[groupedCalls.length - 1];
      if (previous && previous.header === header) {
        previous.calls.push(call);
        return groupedCalls;
      }

      groupedCalls.push({
        header: dayjs(call.created_at).format("MMMM, D YYYY"),
        calls: [call],
      });

      return groupedCalls;
    }, []);
  }, [data]);

  if (error) {
    return <div>Error</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <Spacer space="s" direction="vertical" width="100%">
      <Box marginTop={4}>
        <Typography textAlign="center" variant="displayL">
          Call History
        </Typography>
      </Box>

      <Spacer space="xl" width="100%" direction="vertical">
        {groupedCalls.map((group: any) => (
          <CallGroup
            key={group.header}
            header={group.header}
            calls={group.calls}
          />
        ))}
      </Spacer>

      {data.paginatedCalls.hasNextPage ? (
        <Button type="button" onClick={loadMore} disabled={pagination.loading}>
          Load more
        </Button>
      ) : null}
    </Spacer>
  );
};
export default HomePage;
