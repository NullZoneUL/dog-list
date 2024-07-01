import { setViewMode, getViewMode } from "@utils/mode";

describe("View mode store test", () => {
  const mockGetItem = jest.fn();
  const mockSetItem = jest.fn();
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(mockGetItem);
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(mockSetItem);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Save view mode", () => {
    setViewMode(true);
    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith("viewMode", JSON.stringify(true));
  });

  test("Get view mode", () => {
    getViewMode();
    expect(mockGetItem).toHaveBeenCalledTimes(1);
  });
});
