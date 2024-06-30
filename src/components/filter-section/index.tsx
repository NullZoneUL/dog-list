import Searcher from "@elements/searcher";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDogList } from "./getDogList";
import "./style.scss";

const FilterSection = () => {
  const [list, setList] = useState<DogList>({});
  const allBreedsList = useRef(list);

  const onInput = useCallback((value: string) => {
    const breedList = Object.keys(allBreedsList.current);

    if (breedList.length === 0) {
      return;
    }

    const filteredList: DogList = {};
    breedList
      .filter((item) => item.includes(value))
      .forEach((item) => (filteredList[item] = allBreedsList.current[item]));

    setList(filteredList);
  }, []);

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
      <Searcher onInput={onInput} numResults={Object.keys(list).length} />
    </div>
  );
};

export default FilterSection;
