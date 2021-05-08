import { MemoryRouter, Route } from "react-router-dom";
import { MockedProvider, render, screen } from "../../test-utils";
import CallPage from "../Call";
import { MockedResponse } from "@apollo/client/testing";

import {
  AddNoteDocument,
  AddNoteMutation,
  ArchiveCallDocument,
  ArchiveCallMutation,
  CallInfoDocument,
  CallInfoQuery,
} from "../../generated/graphql";
import { waitFor } from "@testing-library/react";
import userEvents from "@testing-library/user-event";

const callID = "69ece254-e941-483b-90e4-c5fb6d6af926";

const callInfoMock: MockedResponse<CallInfoQuery> = {
  request: {
    query: CallInfoDocument,
    variables: { id: callID },
  },
  result: {
    data: {
      call: {
        id: callID,
        direction: "inbound",
        from: "+33122535282",
        to: "+33183445353",
        duration: 69594,
        via: "+33127904978",
        is_archived: false,
        call_type: "answered",
        created_at: "2021-05-03T10:30:27.499Z",
        notes: [
          {
            id: "272c608e-2a3a-455e-916a-54de8d9e8036",
            content: "Voluptas consequatur eos dolor.",
            __typename: "Note",
          },
          {
            id: "7ecef9f6-670c-4974-b6e3-7ee30ee53870",
            content:
              "Ad molestiae nihil officiis sapiente inventore natus iusto consectetur.",
            __typename: "Note",
          },
        ],
        __typename: "Call",
      },
    },
  },
};

describe("<CallPage/>", function () {
  it("should fetch and render call detais", async function () {
    render(
      <MemoryRouter initialEntries={[`/history/${callID}`]}>
        <MockedProvider mocks={[callInfoMock]}>
          <Route path="/history/:id">
            <CallPage />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText("+33 1 22 53 52 82")).toBeInTheDocument();
    expect(screen.getByText("From: +33 1 22 53 52 82")).toBeInTheDocument();
    expect(screen.getByText("Via: +33 1 27 90 49 78")).toBeInTheDocument();
  });

  it("should archive and restore calls", async function () {
    const archiveCallMock: MockedResponse<ArchiveCallMutation> = {
      request: {
        query: ArchiveCallDocument,
        variables: { id: callID },
      },
      result: {
        data: {
          archiveCall: {
            id: callID,
            is_archived: true,
            __typename: "Call",
          },
        },
      },
    };

    const restoreCallMock: MockedResponse<ArchiveCallMutation> = {
      request: {
        query: ArchiveCallDocument,
        variables: { id: callID },
      },
      result: {
        data: {
          archiveCall: {
            id: callID,
            is_archived: false,
            __typename: "Call",
          },
        },
      },
    };

    render(
      <MemoryRouter initialEntries={[`/history/${callID}`]}>
        <MockedProvider
          mocks={[callInfoMock, archiveCallMock, restoreCallMock]}
        >
          <Route path="/history/:id">
            <CallPage />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.queryByText("Archive")).not.toBeInTheDocument();
    userEvents.click(screen.getByLabelText(/call options/i));
    expect(screen.getByText("Archive")).toBeInTheDocument();

    userEvents.click(screen.getByText("Archive"));
    expect(screen.queryByText(/archived/i)).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/archived/i)).toBeInTheDocument();
    });

    expect(screen.queryByText("Restore")).not.toBeInTheDocument();
    userEvents.click(screen.getByLabelText(/call options/i));
    expect(screen.getByText("Restore")).toBeInTheDocument();

    userEvents.click(screen.getByText("Restore"));
    expect(screen.getByText(/archived/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/archived/i)).not.toBeInTheDocument();
    });
  });

  it("should permit the user to create notes", async function () {
    const contentMock = "This is note";

    const addNoteMock: MockedResponse<AddNoteMutation> = {
      request: {
        query: AddNoteDocument,
        variables: {
          input: { content: contentMock, activityId: callID },
        },
      },
      result: {
        data: {
          addNote: {
            id: callID,
            notes: [
              {
                id: "cfe425e2-8b85-491e-b6f6-733bc8932a30",
                content: contentMock,
                __typename: "Note",
              },
              {
                id: "272c608e-2a3a-455e-916a-54de8d9e8036",
                content: "Voluptas consequatur eos dolor.",
                __typename: "Note",
              },
              {
                id: "7ecef9f6-670c-4974-b6e3-7ee30ee53870",
                content:
                  "Ad molestiae nihil officiis sapiente inventore natus iusto consectetur.",
                __typename: "Note",
              },
            ],
            __typename: "Call",
          },
        },
      },
    };

    render(
      <MemoryRouter initialEntries={[`/history/${callID}`]}>
        <MockedProvider mocks={[callInfoMock, addNoteMock]}>
          <Route path="/history/:id">
            <CallPage />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const addNoteButton = screen.getByRole("button", { name: /add note/i });

    expect(screen.queryByText(contentMock)).not.toBeInTheDocument();
    expect(addNoteButton).toBeEnabled();

    userEvents.type(screen.getByLabelText("Note content"), contentMock);
    userEvents.click(addNoteButton);

    expect(addNoteButton).toBeDisabled();

    await waitFor(() => {
      expect(addNoteButton).toBeEnabled();
    });

    expect(screen.getByText(contentMock)).toBeInTheDocument();
  });
});
