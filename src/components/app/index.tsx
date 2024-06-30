import Header from "@components/header";
import { createContext, useEffect, useState } from "react";
import { getDogList } from "./getDogList";

export const DogListContext = createContext<DogList>({});

const AppContainer = () => {
  const [list, setList] = useState<DogList>({});

  useEffect(() => {
    getDogList()
      .then((data: DogList) => setList(data))
      .catch((error) => console.log("TODO!!!", error));
  }, []);

  return (
    <DogListContext.Provider value={list}>
      <Header />
    </DogListContext.Provider>
  );
};

export default AppContainer;
