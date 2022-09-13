import NavBar from './components/navbar';
import Items from './components/Items'
import './App.css';
import React from 'react';


function App() {
  return (
    <React.Fragment>
      <NavBar/>
        <main className="container">
          <Items/>
        </main>
    </React.Fragment>
  );
}

export default App;
