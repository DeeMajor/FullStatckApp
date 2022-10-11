import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://localhost:7088/api/Stationery";

function useGetStationery(props, myStatList) {
  const [stationeryLists, setStationList] = useState([]);

  useEffect(() => {
    {
      axios
        .get(`${url}`)
        .then((response) => response.data)
        .then((data) => {
          setStationList(data.value);
        })
        .catch((error) => console.error(`Error: ${error}`));
    }
  }, [myStatList]);

  return stationeryLists;
}

function usePostStationery(stationeryList) {
  console.log(stationeryList);
  axios.post(url, stationeryList).then((response) => {
    console.log(response.data);
  });
}

/* export default usePostStationery; */
export { useGetStationery, usePostStationery };
