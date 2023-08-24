import React from "react";

import AppProvider from "./AppProvider";
import LocalesProvider from "./LocalesProvider";
import TodosProvider from "./TodosProvider";

type PropsType = {
  children: React.ReactNode;
};

const providers: React.FC<PropsType>[] = [
  TodosProvider,
  AppProvider,
  LocalesProvider,
];

const RootProvider: React.FC<PropsType> = ({ children }) => {
  return providers.reduce(
    (jsx, Provider) => <Provider>{jsx}</Provider>,
    children
  );
};

export default RootProvider;
