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
} from "./components/Repository/itemListRepo";
import { useGetItems } from "./components/Repository/itemRepo";

function App() {
  const staioneryList = useGetStationery();
  const itemsData = useGetItems();

  const [stList, setstList] = useState();
  const [items, setItems] = useState();
  const [component, setComponent] = useState();

  /*  const [postRes] = usePostStationery(); */
  /*   const [result, setResult] = useState(); */
  /*   const [listPost, setListPost] = useState();

  const postRes = usePostStationery(listPost);
  const [result, setResult] = useState(); */
  /* 
  useEffect(
    (listPost) => {
      setResult(postRes);
    },
    [postRes]
  ); */

  useEffect(() => {
    setstList(staioneryList);
  }, [staioneryList]);

  useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  useEffect(() => {
    setComponent(StionaeryListComponent);
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

  const HandleFetchList = async () => {
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

      /* const itemListToUpdate = itemLists.filter(list.) */
    } catch (error) {
      console.log(error);
    }
  };

  const MakeBought = async (itemList) => {
    console.log(itemList);

    try {
      const resp = await useUpdateListeItem(itemList);
      return 0;
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemCreate = (item) => {};

  const handleItemUpdate = (item) => {};

  const handleItemDelete = (id) => {};

  const handleItemPost = (item) => {};
  /* 
  const Response = (list) => {
    setResult(usePostStationery(list));
  }; */

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
    />
  );

  const ItemsComponent = (
    <Items
      List={stList}
      items={items}
      Create={handleItemCreate}
      Update={handleItemUpdate}
      Delete={handleItemDelete}
      Post={handleItemPost}
    />
  );

  const HandleLink = (component) => {
    if (component === "items") {
      setComponent(ItemsComponent);
    } else if (component === "Stationery") {
      setComponent(StionaeryListComponent);
    }
  };

  return (
    <React.Fragment>
      <NavBar onPage={HandleLink} />
      <div className="container">{component}</div>
    </React.Fragment>
  );
}

export default App;
