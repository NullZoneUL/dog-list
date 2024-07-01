import Switch from "@elements/switch";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Switch Component", () => {
  test("Basic render", () => {
    const onInputMock = jest.fn();
    render(<Switch onInput={onInputMock} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("Default values as true", () => {
    const onInputMock = jest.fn();
    render(<Switch onInput={onInputMock} defaultValue={true} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  test("Click teset", () => {
    const onInputMock = jest.fn();
    render(<Switch onInput={onInputMock} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onInputMock).toHaveBeenCalledWith(true);

    fireEvent.click(checkbox);
    expect(onInputMock).toHaveBeenCalledWith(false);
  });
});
