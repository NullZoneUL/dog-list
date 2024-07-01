const MODE_KEY = "viewMode";

export const setViewMode = (mode: boolean) => {
  localStorage.setItem(MODE_KEY, JSON.stringify(mode));
};

export const getViewMode = (): boolean => {
  return JSON.parse(localStorage.getItem(MODE_KEY) || "false");
};
