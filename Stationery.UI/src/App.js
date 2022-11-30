import NavBar from "./components/navbar";
import StationeryList from "./components/StationeryList/stationeryList";
import Items from "./components/Items/items";
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  useGetStationery,
  useDeleteStationery,
  usePostStationery,
  useUpdateStationery,
  useFetchStationery,
} from "./components/Repository/stationeryRepo";
import {
  useDeleteListItem,
  useGetAllItemLists,
  useUpdateListeItem,
  usePostListItem,
} from "./components/Repository/itemListRepo";
import { useGetItems, useFetchItems } from "./components/Repository/itemRepo";

function App() {
  const staioneryList = useGetStationery();
  const itemsData = useGetItems();

  const [stList, setstList] = useState();
  const [items, setItems] = useState();
  const [component, setComponent] = useState("start");
  const [eventLink, setEventLink] = useState("1");

  useEffect(() => {
    setstList(staioneryList);
  }, [staioneryList]);

  useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  useEffect(() => {
    if (eventLink === "1") {
      setComponent(StionaeryListComponent);
    } else {
      setComponent(ItemsComponent);
    }
  }, [stList]);

  const HandleDeleteStatItem = async (list, itemId) => {
    try {
      const resp = await useDeleteListItem(itemId);
      return 0;
    } catch (error) {
      console.log(error);
      return 1;
    }
  };

  const HandleFetchList = async (comp) => {
    try {
      const list = await useFetchStationery();
      setstList(list.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  const PostList = async (list) => {
    try {
      const postRes = await usePostStationery(list);

      return 0;
    } catch (error) {
      console.log("Error!!", error);
      return 1;
    }
  };

  const HandleStatUpdate = async (stat) => {
    try {
      const response = await useUpdateStationery(stat);
      return 0;
    } catch (error) {
      console.log("Error!!", error);
      return 1;
    }
  };

  const HandleStatDelete = async (id) => {
    try {
      const resp = await useDeleteStationery(id);
      return 0;
    } catch (error) {
      return 1;
    }
  };

  const FetchItems = async (list, item) => {
    try {
      const itemLists = await useGetAllItemLists();

      return itemLists.data.value;
    } catch (error) {
      console.log(error);
    }
  };

  const MakeBought = async (itemList) => {
    try {
      const resp = await useUpdateListeItem(itemList);
      return 0;
    } catch (error) {
      console.log(error);
      return 1;
    }
  };

  const HandleAddItemToList = async (item) => {
    try {
      const resp = await usePostListItem(item);
      HandleFetchList();
      return 0;
    } catch (error) {
      console.log(error);
      return 1;
    }
  };

  const HandleFetchItems = async () => {
    try {
      const resp = await useFetchItems();
      setItems(resp.data.value);
      return 0;
    } catch (error) {
      console.log(error);
      return 1;
    }
  };

  const handleItemDelete = (id) => {};

  const handleItemPost = (item) => {};
  /* 
  const Response = (list) => {
    setResult(usePostStationery(list));
  }; */

  const HandleLink = (component) => {
    if (component === "items") {
      setEventLink("2");
      setComponent(ItemsComponent);
    } else if (component === "Stationery") {
      setEventLink("1");
      setComponent(StionaeryListComponent);
    }
  };

  const StionaeryListComponent = (
    <StationeryList
      List={stList}
      items={items}
      PostList={PostList}
      fetch={HandleFetchList}
      GetListItem={FetchItems}
      MakeBought={MakeBought}
      Update={HandleStatUpdate}
      Delete={HandleStatDelete}
      DeleteStatItem={HandleDeleteStatItem}
      onPage={HandleLink}
    />
  );

  const ItemsComponent = (
    <Items
      List={stList}
      items={items}
      AddItemToList={HandleAddItemToList}
      fetch={HandleFetchList}
      /* Create={handleItemCreate} */
      /* Update={handleItemUpdate} */
      Delete={handleItemDelete}
      Post={handleItemPost}
      onPage={HandleLink}
      FetchItems={HandleFetchItems}
    />
  );

  return (
    <React.Fragment>
      <NavBar active={eventLink} onPage={HandleLink} />
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          <div>{component}</div>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </React.Fragment>
  );
}

export default App;
