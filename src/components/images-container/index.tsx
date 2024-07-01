import InfiniteScroll from "react-infinite-scroll-component";
import Translations from "@assets/translations/en.json";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SelectedBreedContext } from "@components/app";
import { getImages } from "./getImages";
import { RequestStates } from "@utils/requests";
import "./style.scss";

const IMAGES_BY_SECTION = 10;

const ImagesContainer = () => {
  const { value: selectedBreed } = useContext(SelectedBreedContext);
  const [visibleImages, setVisibleImages] = useState<Array<string>>([]);
  const [requestStatus, setRequestStatus] = useState(RequestStates.LOADING);
  const allImagesList = useRef(visibleImages);
  const currentPosition = useRef(0);

  const addImages = useCallback(() => {
    const newImagesSection = allImagesList.current.slice(
      currentPosition.current,
      currentPosition.current + IMAGES_BY_SECTION,
    );
    setVisibleImages((images) => [...images, ...newImagesSection]);
    currentPosition.current += IMAGES_BY_SECTION;
  }, []);

  useEffect(() => {
    allImagesList.current = [];
    currentPosition.current = 0;
    setVisibleImages([]);
    setRequestStatus(RequestStates.LOADING);

    selectedBreed &&
      getImages(selectedBreed)
        .then((resp: Array<string>) => {
          allImagesList.current = resp;
          addImages();
          setRequestStatus(RequestStates.SUCCESS);
        })
        .catch(() => {
          setRequestStatus(RequestStates.ERROR);
        });
  }, [selectedBreed]);

  if (
    requestStatus === RequestStates.ERROR ||
    (requestStatus === RequestStates.SUCCESS &&
      allImagesList.current.length === 0)
  ) {
    return <h1 className="no-images">{Translations.no_images}</h1>;
  }

  return (
    <div className="images-container">
      {visibleImages.length > 0 && (
        <InfiniteScroll
          dataLength={visibleImages.length}
          next={addImages}
          loader={<h4>{Translations.loading}</h4>}
          hasMore={allImagesList.current.length > visibleImages.length}
        >
          {visibleImages?.map((item, index) => (
            <img
              src={item}
              key={`DS_IMAGE_${index}`}
              alt={`DS_IMAGE_${index}`}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ImagesContainer;
