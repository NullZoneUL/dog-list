import Header from "@components/header";
import FilterSection from "@components/filter-section";
import { createContext } from "react";

export const SelectedBreedContext = createContext<string>("");

const AppContainer = () => {
  return (
    <SelectedBreedContext.Provider value={""}>
      <Header />
      <FilterSection />
    </SelectedBreedContext.Provider>
  );
};

export default AppContainer;
