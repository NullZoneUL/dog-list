import Header from "@components/header";
import FilterSection from "@components/filter-section";
import { createContext, useState } from "react";

export const SelectedBreedContext = createContext<{
  value: string;
  setValue: (value: string) => void;
}>({
  value: "",
  setValue: () => {
    //
  },
});

const AppContainer = () => {
  const [selectedBreed, setSelectedBreed] = useState("");

  return (
    <SelectedBreedContext.Provider
      value={{ value: selectedBreed, setValue: setSelectedBreed }}
    >
      <Header />
      <FilterSection />
    </SelectedBreedContext.Provider>
  );
};

export default AppContainer;
