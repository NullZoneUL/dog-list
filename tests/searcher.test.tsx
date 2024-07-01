import Searcher from "@elements/searcher";
import Translations from "@assets/translations/en.json";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.useFakeTimers();

describe("Searcher Component", () => {
  const mockOnInput = jest.fn();

  afterEach(() => {
    jest.clearAllTimers();
    mockOnInput.mockClear();
  });

  test("Basic render", () => {
    const { container } = render(<Searcher onInput={mockOnInput} />);
    expect(container.querySelector(".searcher-container")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(Translations.search),
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("Default value test", () => {
    const defaultValue = "test";
    render(<Searcher onInput={mockOnInput} defaultValue={defaultValue} />);
    expect(screen.getByDisplayValue(defaultValue)).toBeInTheDocument();
  });

  test("onInput callback", async () => {
    render(<Searcher onInput={mockOnInput} />);

    const inputElement = screen.getByPlaceholderText(Translations.search);
    fireEvent.input(inputElement, { target: { value: "search query" } });

    expect(mockOnInput).not.toBeCalled();

    jest.advanceTimersByTime(300);
    await waitFor(() => expect(mockOnInput).toBeCalledWith("search query"));
  });

  test("Correct num of values", () => {
    const numResults = 5;
    render(<Searcher onInput={mockOnInput} numResults={numResults} />);
    expect(
      screen.getByText(`${numResults} ${Translations.results}`),
    ).toBeInTheDocument();
  });

  test("Clean timeout after components is unmounted", () => {
    const { unmount } = render(<Searcher onInput={mockOnInput} />);
    const inputElement = screen.getByPlaceholderText(Translations.search);
    fireEvent.input(inputElement, { target: { value: "search query" } });

    unmount();
    jest.advanceTimersByTime(300);

    expect(mockOnInput).not.toBeCalled();
  });
});
