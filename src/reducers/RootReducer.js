import { combineReducers } from "redux";
import error from "./ErrorReducer";
import user from "./UserReducer";
import {
  menuReducer,
  detailReducer,
  otorisasiReducer,
  attachmentReducer,
  formReducer
} from "./MenuReducer";
import status from "./StatusReducer";

const rootReducer = combineReducers({
  error,
  user,
  status,
  menuReducer,
  detailReducer,
  otorisasiReducer,
  attachmentReducer,
  formReducer
});

export default rootReducer;
