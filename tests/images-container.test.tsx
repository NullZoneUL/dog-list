import ImagesContainer from "@components/images-container";
import Translations from "@assets/translations/en.json";
import fetchMock from "jest-fetch-mock";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { SelectedBreedContext } from "@components/app";

describe("ImagesContainer Component", () => {
  const mockContextValue = { value: "labrador", setValue: jest.fn() };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("API error", async () => {
    fetchMock.mockReject(() => Promise.reject("API is down"));
    render(
      <SelectedBreedContext.Provider value={mockContextValue}>
        <ImagesContainer />
      </SelectedBreedContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(Translations.no_images)).toBeInTheDocument();
    });
  });

  test("Correct response from API", async () => {
    const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
    fetchMock.mockResponseOnce(JSON.stringify({ message: images }));

    render(
      <SelectedBreedContext.Provider value={mockContextValue}>
        <ImagesContainer />
      </SelectedBreedContext.Provider>,
    );

    await waitFor(() => {
      images.forEach((_, index) => {
        expect(screen.getByAltText(`DS_IMAGE_${index}`)).toBeInTheDocument();
      });
    });
  });

  test("Scroll load test", async () => {
    const images = Array.from({ length: 20 }, (_, i) => `image${i + 1}.jpg`);
    fetchMock.mockResponseOnce(JSON.stringify({ message: images }));

    render(
      <SelectedBreedContext.Provider value={mockContextValue}>
        <ImagesContainer />
      </SelectedBreedContext.Provider>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole("img", { name: `DS_IMAGE_0` }),
      ).toBeInTheDocument();
    });

    fireEvent.scroll(window, {
      target: { scrollingElement: { scrollTop: 1000 } },
    });

    await waitFor(() => {
      expect(
        screen.getByRole("img", { name: `DS_IMAGE_10` }),
      ).toBeInTheDocument();
    });
  });
});
