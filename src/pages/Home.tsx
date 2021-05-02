import React, { useState } from "react";
import { Button, Spacer, Typography } from "@aircall/tractor";

import { useCallListQuery } from "../generated/graphql";
import CallItem from "../components/CallItem";

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
        .finally(() =>
          setPagination((pagination) => ({ ...pagination, loading: false }))
        );

      return { ...pagination, loading: true };
    });
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <Spacer space="s" direction="vertical" width="100%">
      <Typography variant="displayXL">AirCall</Typography>

      <Spacer space="s" direction="vertical" width="100%" padding="0 16px">
        {data.paginatedCalls.nodes?.map((node) => (
          <CallItem
            key={node.id}
            number={node.call_type === "inbound" ? node.from : node.to}
            direction={node.direction}
            callType={node.call_type}
            createdAt={node.created_at}
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
