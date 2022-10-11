import NavBar from "./components/navbar";
import Items from "./components/Items/items";
import StationeryList from "./components/StationeryList/stationeryList";
import Fetch from "./components/Repository/stationeryRepo";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [allLists, setAllLists] = useState([]);

  const items = [
    {
      itemId: 1,
      Name: "Item 1",
      Description: "Describe me 1",
      Extra: "Extra for test",
    },
    { itemId: 2, Name: "Item 2", Description: "Describe me 2" },
    { itemId: 3, Name: "Item 3", Description: "Describe" },
    { itemId: 4, Name: "Item 4", Description: "Describe" },
    { itemId: 5, Name: "Item 5", Description: "Describe" },
  ];

  return (
    <React.Fragment>
      <itemsContext.Provider value={items}>
        <statListsContext.Provider value={allLists}>
          <NavBar />
          <div className="container">
            <Items />
          </div>
        </statListsContext.Provider>
      </itemsContext.Provider>
    </React.Fragment>
  );
}
export const itemsContext = React.createContext();
export const statListsContext = React.createContext();
export default App;
