import NavBar from "./components/navbar";
import StationeryList from "./components/StationeryList/stationeryList";
import Items from "./components/Items/items";
import "./App.css";
import React, { useEffect, useState } from "react";
import { useGetStationery } from "./components/Repository/stationeryRepo";
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

  const handleStatCreate = (stat) => {};

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
      Create={handleStatCreate}
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
