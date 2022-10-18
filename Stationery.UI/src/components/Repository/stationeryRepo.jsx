import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://localhost:7088/api/Stationery";

function useGetStationery(props) {
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
  console.log(stationeryList);

  async function Post() {
    const request = await axios.post(url, stationeryList);
    console.log(request.data);
  }
  Post();

  /* axios.post(url, stationeryList).then((response) => {
    console.log(response.data);
  }); */
}

function useDeleteStationery(id) {
  axios
    .delete(`${url}/${id}`)
    .then(() => console.log("Delete successful"))
    .catch((error) => console.error(`Error: ${error}`));
}
/* export default usePostStationery; */
export { useGetStationery, usePostStationery, useDeleteStationery };
