import { useState } from "react";

type useBooleanReturnType = [
  boolean,
  {
    on: () => void;
    off: () => void;
    set: (state: boolean) => void;
    toggle: () => void;
  }
];

type useBooleanType = (initialState?: boolean) => useBooleanReturnType;

const useBoolean: useBooleanType = (initialValue: boolean = false) => {
  const [state, setState] = useState<boolean>(initialValue);

  return [
    state,
    {
      on: setState.bind(null, true),
      off: setState.bind(null, false),
      toggle: setState.bind(null, (state) => !state),
      set: (state: boolean) => setState(state),
    },
  ];
};

export default useBoolean;
