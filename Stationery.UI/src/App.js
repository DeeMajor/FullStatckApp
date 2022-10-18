import NavBar from "./components/navbar";
import Items from "./components/Items/items";
import "./App.css";
import React from "react";
import { useGetStationery } from "./components/Repository/stationeryRepo";
import { useGetItems } from "./components/Repository/itemRepo";

function App() {
  const staioneryList = useGetStationery();
  const items = useGetItems();

  return (
    <React.Fragment>
      <itemsContext.Provider value={items}>
        <statListsContext.Provider value={staioneryList}>
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
