import React, { useMemo, useState } from "react";

import { useCallListQuery } from "../generated/graphql";
import dayjs from "dayjs";
import CallGroup from "../components/CallGroup";
import {
  ArchiveFilled,
  Box,
  Button,
  CloseOutlined,
  Flex,
  Spacer,
  Typography,
} from "@aircall/tractor";
import HistoryFilter from "../components/HistoryFilter";

const LIMIT = 10;

const HistoryPage = () => {
  const [filters, setFilters] = useState<{
    type: string[];
    direction: string[];
    archived: boolean;
  }>({
    type: [],
    direction: [],
    archived: false,
  });

  const toggleFilter = (toggledFilter: Record<string, string>) => {
    setFilters((filters) => {
      const newFilters = { ...filters };

      if (toggledFilter.type) {
        newFilters.type = [...newFilters.type];

        newFilters.type.includes(toggledFilter.type)
          ? newFilters.type.splice(
              newFilters.type.indexOf(toggledFilter.type),
              1
            )
          : newFilters.type.push(toggledFilter.type);
      }

      if (toggledFilter.direction) {
        newFilters.direction = [...newFilters.direction];

        newFilters.direction.includes(toggledFilter.direction)
          ? newFilters.direction.splice(
              newFilters.direction.indexOf(toggledFilter.direction),
              1
            )
          : filters.direction.push(toggledFilter.direction);
      }

      if (toggledFilter.archived) {
        newFilters.archived = !newFilters.archived;
      }

      return newFilters;
    });
  };

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

  const filteredCalls = useMemo(() => {
    if (!data?.paginatedCalls.nodes) {
      return [];
    }

    return data.paginatedCalls.nodes.filter((call) => {
      const hasType =
        !filters.type.length || filters.type.includes(call.call_type);

      const hasDirection =
        !filters.direction.length || filters.direction.includes(call.direction);

      return hasType && hasDirection && filters.archived === call.is_archived;
    });
  }, [data, filters]);

  const groupedCalls = useMemo(() => {
    const calls = filteredCalls;

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
  }, [filteredCalls]);

  if (error) {
    return <div>Error</div>;
  }

  if (loading || !data) {
    return <div>Loading</div>;
  }

  return (
    <Spacer space="s" direction="vertical" width="100%" paddingTop={8}>
      <Flex
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="72px"
        justifyContent="center"
        alignItems="center"
        paddingX={4}
        boxShadow={1}
        zIndex={10}
        backgroundColor="#fff"
      >
        <Box marginLeft="auto">
          <HistoryFilter toggleFilter={toggleFilter} filters={filters} />
        </Box>
      </Flex>

      <Box marginTop={4} paddingX={4}>
        <Typography variant="displayL">Call History</Typography>
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

      <Flex justifyContent="center" marginBottom={4}>
        {data.paginatedCalls.hasNextPage ? (
          <Button
            type="button"
            size="small"
            onClick={loadMore}
            disabled={pagination.loading}
          >
            Load more
          </Button>
        ) : null}
      </Flex>

      <Flex justifyContent="center" marginBottom={4}>
        <Button
          type="button"
          variant="darkGhost"
          onClick={() => toggleFilter({ archived: "archived" })}
        >
          {filters.archived ? <CloseOutlined /> : <ArchiveFilled />}
          Archived
        </Button>
      </Flex>
    </Spacer>
  );
};
export default HistoryPage;
