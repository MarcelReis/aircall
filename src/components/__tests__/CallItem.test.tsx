import { render, screen } from "../../test-utils";
import CallItem from "../CallItem";
import { ComponentProps } from "react";

const defaultProps: ComponentProps<typeof CallItem> = {
  call_type: "voicemail",
  created_at: "2021-04-30T11:31:14.567Z",
  direction: "inbound",
  from: "+33141645422",
  id: "c59fe15f-5ad0-4bc9-9242-50dc74c1b585",
  is_archived: true,
  to: "+33147037033",
};

describe("<CallItem/>", function () {
  it("should render the call information", function () {
    render(<CallItem {...defaultProps} />);

    screen.getByText(defaultProps.call_type);
    screen.getByText("+33 1 41 64 54 22");
  });
});
