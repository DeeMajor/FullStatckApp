import NavBar from "./components/navbar";
import StationeryList from "./components/StationeryList/stationeryList";
import Items from "./components/Items/items";
import "./App.css";
import React, { useEffect, useState } from "react";
import { useGetStationery } from "./components/Repository/stationeryRepo";
import { useGetItems } from "./components/Repository/itemRepo";

function App() {
  const staioneryList = useGetStationery();
  const items = useGetItems();

  const [component, setComponent] = useState();

  useEffect(() => {
    setComponent(<StationeryList />);
  }, []);

  const HandleLink = (component) => {
    if (component === "items") {
      setComponent(<Items />);
    } else if (component === "Stationery") {
      setComponent(<StationeryList />);
    }
  };

  return (
    <React.Fragment>
      <itemsContext.Provider value={items}>
        <statListsContext.Provider value={staioneryList}>
          <NavBar onPage={HandleLink} />
          <div className="container">{component}</div>
        </statListsContext.Provider>
      </itemsContext.Provider>
    </React.Fragment>
  );
}
export const itemsContext = React.createContext();
export const statListsContext = React.createContext();
export default App;
