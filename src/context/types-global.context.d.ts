import { ReactNode } from 'react';

export type UserData = {
  userLogin: string;
}

export type Action =
  | { type: 'USER_SIGNED_IN', payload: UserData }
  | { type: 'USER_UPDATED', payload: UserData }
  | { type: 'USER_SIGNED_OUT', payload: undefined }
  | { type: 'UPDATE_THEME_COLOR', payload: string }

export type State = { userData: UserData; currentTheme: string; }
export type GlobalProviderProps = { children: ReactNode }
export type Dispatch = (action: Action) => void
