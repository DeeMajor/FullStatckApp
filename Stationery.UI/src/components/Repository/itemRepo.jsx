import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://localhost:7088/api/Items";

function useGetItems(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${url}`);
      setItems(request.data.value);
    }
    fetchData();
  }, []);
  /*   do {} while (stationeryLists !== undefined); */
  return items;
}

export { useGetItems };
