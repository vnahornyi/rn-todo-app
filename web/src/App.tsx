import { useEffect } from "react";

import RootProvider from "../../shared/providers";
import useLocale from "../../shared/hooks/useLocale";

import List from "./components/List";
import Header from "./components/Header";

import "./App.css";

function AppInner() {
  const { prepareLocale } = useLocale();

  useEffect(() => {
    prepareLocale();
  }, [prepareLocale]);

  return (
    <>
      <Header />
      <List />
    </>
  );
}

function App() {
  return (
    <RootProvider>
      <AppInner />
    </RootProvider>
  );
}

export default App;
