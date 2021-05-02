import React from "react";
import { MockedProvider, render, screen, waitFor } from "../../test-utils";
import { CallListDocument, CallListQuery } from "../../generated/graphql";
import HomePage from "../Home";
import { MockedResponse } from "@apollo/client/testing";
import userEvents from "@testing-library/user-event";

const callListMutationMock1: MockedResponse<CallListQuery> = {
  request: {
    query: CallListDocument,
    variables: { offset: 0, limit: 10 },
  },
  result: {
    data: {
      paginatedCalls: {
        nodes: [
          {
            id: "a252ba4b-c680-4876-a288-a887c01f71c9",
            direction: "inbound",
            from: "+33140249686",
            to: "+33141645422",
            is_archived: true,
            call_type: "voicemail",
            created_at: "2021-04-30T05:05:34.691Z",
            __typename: "Call",
          },
          {
            id: "3ae00776-628f-4a45-88ac-f5b642c0be6b",
            direction: "outbound",
            from: "+33174672416",
            to: "+33102836165",
            is_archived: false,
            call_type: "missed",
            created_at: "2021-04-30T05:54:04.614Z",
            __typename: "Call",
          },
          {
            id: "a252ba4b-c680-4876-a288-a887c01f71c9",
            direction: "inbound",
            from: "+33140249686",
            to: "+33141645422",
            is_archived: true,
            call_type: "voicemail",
            created_at: "2021-04-30T05:05:34.691Z",
            __typename: "Call",
          },
          {
            id: "3ae00776-628f-4a45-88ac-f5b642c0be6b",
            direction: "outbound",
            from: "+33174672416",
            to: "+33102836165",
            is_archived: false,
            call_type: "missed",
            created_at: "2021-04-30T05:54:04.614Z",
            __typename: "Call",
          },
        ],
        totalCount: 8,
        hasNextPage: true,
        __typename: "PaginatedCalls",
      },
    },
  },
};

const callListMutationMock2: MockedResponse<CallListQuery> = {
  request: {
    query: CallListDocument,
    variables: { offset: 10, limit: 10 },
  },
  result: {
    data: {
      paginatedCalls: {
        nodes: [
          {
            id: "a252ba4b-c681-4876-a288-a887c01f71c9",
            direction: "inbound",
            from: "+33140249686",
            to: "+33141645422",
            is_archived: true,
            call_type: "voicemail",
            created_at: "2021-04-30T05:05:34.691Z",
            __typename: "Call",
          },
          {
            id: "3ae00776-621f-4a45-88ac-f5b642c0be6b",
            direction: "outbound",
            from: "+33174672416",
            to: "+33102836165",
            is_archived: false,
            call_type: "missed",
            created_at: "2021-04-30T05:54:04.614Z",
            __typename: "Call",
          },
          {
            id: "a252badb-c680-4876-a288-a887c01f71c9",
            direction: "inbound",
            from: "+33140249686",
            to: "+33141645422",
            is_archived: true,
            call_type: "voicemail",
            created_at: "2021-04-30T05:05:34.691Z",
            __typename: "Call",
          },
          {
            id: "3ae0z776-628f-4a45-88ac-f5b642c0be6b",
            direction: "outbound",
            from: "+33174672416",
            to: "+33102836165",
            is_archived: false,
            call_type: "missed",
            created_at: "2021-04-30T05:54:04.614Z",
            __typename: "Call",
          },
        ],
        totalCount: 8,
        hasNextPage: false,
        __typename: "PaginatedCalls",
      },
    },
  },
};

describe("<HomePage/>", () => {
  it("Should render all items and paginate them", async () => {
    render(
      <MockedProvider mocks={[callListMutationMock1, callListMutationMock2]}>
        <HomePage />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      screen.getByRole("button", { name: /load more/i });
    });

    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeEnabled();

    userEvents.click(button);
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(screen.queryByText(/load more/i)).not.toBeInTheDocument();
    });
  });
});
