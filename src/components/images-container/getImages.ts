import { BASE_URL, RequestServices } from "@utils/requests";

export const getImages = (breed: string) =>
  fetch(
    `${BASE_URL}${RequestServices.images_1}${breed}${RequestServices.images_2}`,
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((res) => res.message);
