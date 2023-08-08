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

function useFetchStationery() {
  return axios.get(`${url}`);
}

function usePostStationery(stationeryList) {
  return axios.post(url, stationeryList);
}

function useUpdateStationery(stationeryList) {
  return axios.put(url, stationeryList);
}

function useDeleteStationery(id) {
  return axios.delete(`${url}/${id}`);
}

export {
  useGetStationery,
  usePostStationery,
  useDeleteStationery,
  useUpdateStationery,
  useFetchStationery,
};
