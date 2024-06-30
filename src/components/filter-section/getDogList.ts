import { BASE_URL, RequestServices } from "@utils/requests";

export const getDogList = () =>
  fetch(`${BASE_URL}${RequestServices.list}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((res) => res.message);
