import Header from "@components/header";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Header Component", () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(jest.fn());
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Basic render", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    const switchElement = screen.getByRole("checkbox");
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
  });

  test("Page view mode switch", () => {
    render(<Header />);

    const switchElement = screen.getByRole("checkbox");

    fireEvent.click(switchElement);
    expect(document.documentElement.getAttribute("data-color-mode")).toBe(
      "dark",
    );

    fireEvent.click(switchElement); // Cambiar de nuevo el estado del switch
    expect(document.documentElement.getAttribute("data-color-mode")).toBe(
      "light",
    );
  });
});
