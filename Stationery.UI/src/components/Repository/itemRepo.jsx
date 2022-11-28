import axios from "axios";
import { useEffect, useState } from "react";

const url = "https://mystationery.azurewebsites.net/api/Items";

function useGetItems(props) {
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

export { useGetItems };
