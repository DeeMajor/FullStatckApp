import NavBar from "./components/navbar";
import StationeryList from "./components/StationeryList/stationeryList";
import Items from "./components/Items/items";
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  useGetStationery,
  usePostStationery,
} from "./components/Repository/stationeryRepo";
import { useGetItems } from "./components/Repository/itemRepo";

function App() {
  const staioneryList = useGetStationery();
  const itemsData = useGetItems();

  const [stList, setstList] = useState();
  const [items, setItems] = useState();
  const [component, setComponent] = useState();

  useEffect(() => {
    setstList(staioneryList);
  }, [staioneryList]);

  useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  useEffect(() => {
    setComponent(StionaeryListComponent);
  }, [stList]);

  const HandleStatCreate = (listName) => {
    const newList = {
      Child: listName,
      Status: "Uncomplete",
    };

    let newId = null;

    if (stList.length === 0) {
      newId = 1;
    } else {
      newId = stList[stList.length - 1].id + 1;
    }

    const tempList = {
      id: newId,
      items: [],
      child: listName,
      status: "Uncomplete",
    };

    const response = usePostStationery(newList);

    console.log("Test me", response);

    if (response === 0) {
      setstList([...stList, tempList]);

      return response;
    } else {
      return response;
    }

    console.log(response);
  };

  const handleStatUpdate = (stat) => {};

  const handleStatDelete = (id) => {};

  const handleStatPost = (stat) => {};

  const handleItemCreate = (item) => {};

  const handleItemUpdate = (item) => {};

  const handleItemDelete = (id) => {};

  const handleItemPost = (item) => {};

  const StionaeryListComponent = (
    <StationeryList
      List={stList}
      items={items}
      Create={HandleStatCreate}
      Update={handleStatUpdate}
      Delete={handleStatDelete}
      Post={handleStatPost}
    />
  );

  const ItemsComponent = (
    <Items
      List={staioneryList}
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
