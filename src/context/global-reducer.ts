
import { Action, State } from "./types-global.context";

export default function globalReducer(state: State, { type, payload }: Action) {
  switch (type) {
    case 'USER_SIGNED_IN':
      return Object.assign({}, state, { userData: payload });
    case 'USER_UPDATED':
      return Object.assign({}, state, { userData: payload });
    case 'USER_SIGNED_OUT':
      return Object.assign({}, state, { userData: payload });
    case 'UPDATE_THEME_COLOR':
      return Object.assign({}, state, { userData: payload });
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}
