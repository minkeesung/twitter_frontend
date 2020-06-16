export const LOGOUT = "LOGOUT";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

interface UserState {
  id: string;
  email: string;
}

export interface SessionState {
  currentUser: UserState | null;
}

interface LogoutAction {
  type: typeof LOGOUT;
  currentUser: null;
}

interface ReceiveUserAction {
  type: typeof RECEIVE_CURRENT_USER;
  currentUser: UserState;
}

export type SessionActionTypes = LogoutAction | ReceiveUserAction;
