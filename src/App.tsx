import React from "react";
import logo from "./logo.svg";
import "./App.css";

// Components
import Counter from "./components/Counter/Counter";
import List from "./components/List/List";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Counter />

      <List />
    </div>
  );
}

export default App;
