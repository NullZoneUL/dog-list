import FilterSection from "@components/filter-section";
import fetchMock from "jest-fetch-mock";
import Translations from "@assets/translations/en.json";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import { SelectedBreedContext } from "@components/app";

describe("FilterSection Component", () => {
  const mockSetValue = jest.fn();
  const mockContextValue = { value: "labrador", setValue: mockSetValue };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Basic render", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: { breed1: ["sub1", "sub2"], breed2: [] } }),
    );

    const { unmount } = await act(async () => {
      return render(
        <SelectedBreedContext.Provider value={mockContextValue}>
          <FilterSection />
        </SelectedBreedContext.Provider>,
      );
    });

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).toBeNull();
      expect(screen.queryByText(/Error/i)).toBeNull();
      expect(screen.getByText(/sub1/i)).toBeInTheDocument();
      expect(screen.getByText(/sub2/i)).toBeInTheDocument();
    });

    unmount();
  });

  test("Breed and sub-breed sections behavior", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: { breed1: ["sub1", "sub2"], breed2: [] } }),
    );

    await act(async () => {
      render(
        <SelectedBreedContext.Provider value={mockContextValue}>
          <FilterSection />
        </SelectedBreedContext.Provider>,
      );
    });

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).toBeNull();
    });

    const breedSelect = screen.getByTestId("DS_BREED_SELECT");
    fireEvent.change(breedSelect, { target: { value: "breed2" } });

    await waitFor(() => {
      expect(
        screen.queryByTestId("DS_SUB_BREED_SELECT"),
      ).not.toBeInTheDocument();
    });

    fireEvent.change(breedSelect, { target: { value: "breed1" } });

    await waitFor(() => {
      const subBreedSelect = screen.getByTestId("DS_SUB_BREED_SELECT");
      expect(subBreedSelect).toBeInTheDocument();
      fireEvent.change(subBreedSelect, { target: { value: "sub2" } });
    });

    await waitFor(() => {
      expect(mockSetValue).toHaveBeenCalledWith("breed1/sub2");
    });
  });

  test("Filter by search", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: { breed1: ["sub1", "sub2"], breed2: [] } }),
    );

    await act(async () => {
      render(
        <SelectedBreedContext.Provider value={mockContextValue}>
          <FilterSection />
        </SelectedBreedContext.Provider>,
      );
    });

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).toBeNull();
    });

    const searchInput = screen.getByPlaceholderText(Translations.search);
    fireEvent.change(searchInput, { target: { value: "breed" } });

    await waitFor(() => {
      expect(screen.getByText(/breed1/i)).toBeInTheDocument();
      expect(screen.getByText(/breed2/i)).toBeInTheDocument();
      expect(screen.queryByText(/sub1/i)).toBeInTheDocument();
      expect(screen.queryByText(/sub2/i)).toBeInTheDocument();
    });
  });

  test("API error", async () => {
    fetchMock.mockReject(() => Promise.reject("API is down"));

    await act(async () => {
      render(
        <SelectedBreedContext.Provider value={mockContextValue}>
          <FilterSection />
        </SelectedBreedContext.Provider>,
      );
    });

    expect(screen.getByText(Translations.api_error)).toBeInTheDocument();
  });
});
