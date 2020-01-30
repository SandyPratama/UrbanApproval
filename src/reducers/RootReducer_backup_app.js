import { combineReducers } from "redux";
import error from "./ErrorReducer";
import user from "./UserReducer";
import { menuReducer, detailReducer, otorisasiReducer } from "./MenuReducer";
import status from "./StatusReducer";
import { actionTypes } from "actions/MenuActions";

const appReducer = combineReducers({
  error,
  user,
  status,
  menuReducer,
  detailReducer,
  otorisasiReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
