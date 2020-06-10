import constants from "../constants";
import produce from "immer";

const SessionReducer = produce((draft, action) => {
  switch (action.type) {
    case constants.RECEIVE_CURRENT_USER:
      draft.currentUser = action.currentUser;
      return;
    case constants.LOGOUT:
      draft.currentUser = null;
      return;
    default:
      return;
  }
}, null);

export default SessionReducer;
