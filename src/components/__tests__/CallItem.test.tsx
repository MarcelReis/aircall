import { render, screen } from "../../test-utils";
import CallItem from "../CallItem";
import { ComponentProps } from "react";

const defaultProps: ComponentProps<typeof CallItem> = {
  number: "+33141645422",
  direction: "inbound",
  callType: "voicemail",
  createdAt: "2021-04-27T09:43:27.659Z",
};

describe("<CallItem/>", function () {
  it("should render the call information", function () {
    render(<CallItem {...defaultProps} />);

    screen.getByText(defaultProps.callType);
    screen.getByText("+33 1 41 64 54 22");
  });
});
