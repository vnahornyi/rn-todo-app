import RootProvider from "../../shared/providers";

import List from "./components/List";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <RootProvider>
      <Header />
      <List />
    </RootProvider>
  );
}

export default App;
