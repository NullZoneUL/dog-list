import { BASE_URL, RequestServices } from "@utils/requests";

export const getDogList = () =>
  fetch(`${BASE_URL}${RequestServices.list}`)
    .then((res) => res.json())
    .then((res) => res.message);
