import Searcher from "@elements/searcher";
import Select from "@elements/select";
import Translations from "@assets/translations/en.json";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from "react";
import { SelectedBreedContext } from "@components/app";
import { getDogList } from "./getDogList";
import "./style.scss";

const SELECTION_DELAY = 300;

const FilterSection = () => {
  const { setValue: setBreedInContext } = useContext(SelectedBreedContext);
  const [selectedBreed, setSelectedBreed] = useState(0);
  const [selectedSubBreed, setSelectedSubBreed] = useState(0);
  const [list, setList] = useState<DogList>({});
  const allBreedsList = useRef(list);
  const timeoutRef = useRef<number>();

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
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (subBreedsList?.length > 0) {
        setBreedInContext(subBreedsList[selectedSubBreed]);
      } else {
        setBreedInContext(arrayBreedsList[selectedBreed]);
      }
    }, SELECTION_DELAY);

    () => {
      window.clearTimeout(timeoutRef.current);
    };
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
