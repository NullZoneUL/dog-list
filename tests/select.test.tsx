import Select from "@elements/select";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Select Component", () => {
  const items = ["Option 1", "Option 2", "Option 3"];
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("Basic render", () => {
    render(<Select id="test-select" items={items} onChange={mockOnChange} />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(items.length);

    items.forEach((item, index) => {
      expect(options[index]).toHaveTextContent(item);
    });
  });

  test("Calls onChange with the correct index when selection changes", () => {
    render(<Select id="test-select" items={items} onChange={mockOnChange} />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { selectedIndex: 1 } });
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  test("Calls onChange with index 0 on initial render", () => {
    render(<Select id="test-select" items={items} onChange={mockOnChange} />);
    expect(mockOnChange).toHaveBeenCalledWith(0);
  });
});
