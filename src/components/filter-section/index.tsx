import Searcher from "@elements/searcher";
import Select from "@elements/select";
import Translations from "@assets/translations/en.json";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getDogList } from "./getDogList";
import "./style.scss";

const FilterSection = () => {
  const [selectedBreed, setSelectedBreed] = useState(0);
  const [selectedSubBreed, setSelectedSubBreed] = useState(0);
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

  const arrayBreedsList = useMemo(() => Object.keys(list), [list]);

  const subBreedsList = useMemo(
    () => list[arrayBreedsList[selectedBreed]],
    [list, arrayBreedsList, selectedBreed],
  );

  useEffect(() => {
    selectedSubBreed > 0 &&
      subBreedsList?.length === 0 &&
      setSelectedSubBreed(0);
  }, [selectedBreed]);

  useEffect(() => {
    if (subBreedsList?.length > 0) {
      console.log("TODO!!!", subBreedsList[selectedSubBreed]);
    } else {
      console.log("TODO!!!", arrayBreedsList[selectedBreed]);
    }
  }, [selectedBreed, selectedSubBreed, subBreedsList, arrayBreedsList]);

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
      <Searcher onInput={onInput} numResults={arrayBreedsList.length} />
      <div className="filter-select-container">
        {arrayBreedsList.length > 0 ? (
          <>
            <Select
              id="DS_BREED_SELECT"
              items={arrayBreedsList}
              onChange={setSelectedBreed}
            />
            {subBreedsList?.length > 0 && (
              <Select
                id="DS_SUB_BREED_SELECT"
                items={subBreedsList}
                onChange={setSelectedSubBreed}
              />
            )}
          </>
        ) : (
          <p>{Translations.no_results}</p>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
