import logo from "./logo.svg";
import "./App.css";

// Components
import Counter from "./components/Counter/Counter";
import List from "./components/List/List";
import Posts from "./components/Posts/Posts";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Counter />

      <List />

      <Posts />
    </div>
  );
}

export default App;
