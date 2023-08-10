import RootProvider from "@todoapp/shared/src/providers";
import "./App.css";
import List from "./components/List";

function App() {
  return (
    <RootProvider>
      <List />
    </RootProvider>
  );
}

export default App;
