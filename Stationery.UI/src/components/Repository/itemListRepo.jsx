import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://fsaui.azurewebsites.net/api/ItemLists/";

function useGetItemLists(id) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${url}${id}`);
      setItems(request.data.value);
    }
    fetchData();
  }, []);
  return items;
}

function useFetchItemList(id) {
  return axios.get(`${url}${id}`);
}

function useGetAllItemLists() {
  return axios.get(`${url}`);
}

function useDeleteListItem(id) {
  return axios.delete(`${url}${id}`);
}

function useUpdateListeItem(itemList) {
  return axios.put(url, itemList);
}

function usePostListItem(itemList) {
  return axios.post(url, itemList);
}

export {
  useGetItemLists,
  useFetchItemList,
  useDeleteListItem,
  usePostListItem,
  useGetAllItemLists,
  useUpdateListeItem,
};
