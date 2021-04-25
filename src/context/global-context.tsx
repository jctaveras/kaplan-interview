import React, { FunctionComponent, createContext, useReducer, useContext } from 'react';

import globalReducer from './global-reducer';
import { State, Dispatch, GlobalProviderProps } from './types-global.context';

const GlobalStateContext = createContext<State | undefined>(undefined);
const GlobalDispatchContext = createContext<Dispatch | undefined>(undefined);
const initialState = {} as State

export const GlobalProvider: FunctionComponent<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export function useGlobalState() {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }

  return context;
}

export function useGlobalDispatch() {
  const context = useContext(GlobalDispatchContext);

  if (!context) {
    throw new Error('useGlobalDispatch must be used within a GlobalProvider');
  }

  return context;
}
