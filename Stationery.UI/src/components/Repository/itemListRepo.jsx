import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://localhost:7088/api/ItemLists/";

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

function useGetAllItemLists() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${url}`);
      setItems(request.data.value);
    }
    fetchData();
  }, []);
  return items;
}

function useDeleteListItem(id) {
  return axios.delete(`${url}${id}`);
}

function usePostListItem(itemList) {
  console.log(itemList);
  let error = 0;

  async function Post() {
    try {
      const request = await axios.post(url, itemList);
    } catch (error) {
      error = 1;
    }
  }
  Post();

  return error;
}

export {
  useGetItemLists,
  useDeleteListItem,
  usePostListItem,
  useGetAllItemLists,
};
