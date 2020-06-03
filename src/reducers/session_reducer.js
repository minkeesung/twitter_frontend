import constants from "../constants";
import produce from "immer";

const _nullUser = Object.freeze({
  currentUser: null,
  errors: [],
});

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
}, _nullUser);

export default SessionReducer;
