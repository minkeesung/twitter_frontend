import constants from "../constants";
import produce, { Draft } from "immer";
import { SessionState, SessionActionTypes } from "../store/session/types";

const initialState: SessionState = { currentUser: null };

const SessionReducer = produce(
  (draft: Draft<SessionState>, action: SessionActionTypes) => {
    switch (action.type) {
      case constants.RECEIVE_CURRENT_USER:
        if (draft) draft.currentUser = action.currentUser;
        return;
      case constants.LOGOUT:
        draft.currentUser = null;
        return;
      default:
        return;
    }
  },
  initialState
);

export default SessionReducer;
