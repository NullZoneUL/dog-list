import Searcher from "@elements/searcher";
import { useEffect, useRef, useState } from "react";
import { getDogList } from "./getDogList";
import "./style.scss";

const FilterSection = () => {
  const [list, setList] = useState<DogList>({});
  const allBreedsList = useRef<DogList>();

  useEffect(() => {
    getDogList()
      .then((data: DogList) => {
        allBreedsList.current = data;
        setList(data);
      })
      .catch((error) => console.log("TODO!!!", error));
  }, []);

  return (
    <div className="filter-section-container">
      <Searcher
        onInput={() => console.log("TODO!!!")}
        numResults={Object.keys(list).length}
      />
    </div>
  );
};

export default FilterSection;
