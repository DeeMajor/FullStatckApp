import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://localhost:7088/api/Stationery";

function useGetStationery() {
  const [stationeryLists, setStationList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${url}`);
      setStationList(request.data.value);
    }
    fetchData();
  }, []);
  /*   do {} while (stationeryLists !== undefined); */
  return stationeryLists;
}

function usePostStationery(stationeryList) {
  let exitCode = 1;

  axios
    .post(url, stationeryList)
    .then((exitCode = exitCode - 1))
    .catch((exitCode = exitCode - 1));

  /*   if (request.data.statusCode === 200) {
    exitCode = 1;
  } */

  return exitCode;
}

function useDeleteStationery(id) {
  axios
    .delete(`${url}/${id}`)
    .then(() => console.log("Delete successful"))
    .catch((error) => console.error(`Error: ${error}`));
}
/* export default usePostStationery; */
export { useGetStationery, usePostStationery, useDeleteStationery };
