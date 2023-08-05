import TodosProvider from "./TodosProvider";

export type ProviderPropsType = {
  children: React.ReactNode;
};

const providers: React.FC<ProviderPropsType>[] = [TodosProvider];

const RootProvider: React.FC<ProviderPropsType> = ({ children }) => {
  return providers.reduce(
    (jsx, Provider) => <Provider>{jsx}</Provider>,
    children
  );
};

export default RootProvider;
