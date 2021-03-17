import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useReducer,
} from "react";
import { GlobalState, DispatchObject } from "./Types";
import Reducer from "./Reducer";

const GlobalStateContext = createContext({
  state: {} as GlobalState,
  dispatch: {} as Dispatch<DispatchObject>,
});

const emptyState: GlobalState = {
  currentUser: undefined,
  usingDB: false,
  users: [],
  listings: [],
  categories: [],
  advertisements: [],
};

const GlobalStateProvider = ({
  children,
  initialState = emptyState,
}: {
  children: ReactNode;
  initialState?: GlobalState;
}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export default GlobalStateProvider;
