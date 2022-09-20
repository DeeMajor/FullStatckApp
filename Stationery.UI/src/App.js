import NavBar from "./components/navbar";
import Items from "./components/Items/items";
import "./App.css";
import React from "react";

export const itemsContext = React.createContext();

function App() {
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
        <NavBar />
        <div className="container">
          <Items />
        </div>
      </itemsContext.Provider>
    </React.Fragment>
  );
}

export default App;
