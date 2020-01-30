import { actionTypes } from "actions/MenuActions";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const menuState = {
  menu: []
};

const detailState = {
  detail: []
};

const otorisasiState = {
  otorisasi: []
};

const menuReducer = (state = menuState, action) => {
  switch (action.type) {
    case actionTypes.MENU_REQUEST:
      return {
        ...state
      };
    case actionTypes.MENU_SUCCESS:
      return {
        ...state,
        menu: action.menu.Data
      };
    default:
      return {
        ...state,
        menu: []
      };
  }
};

const detailReducer = (state = detailState, action) => {
  switch (action.type) {
    case actionTypes.DETAIL_REQUEST:
      return {
        ...state
      };
    case actionTypes.DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.detail.Data
      };
    default:
      return state;
  }
};

const otorisasiReducer = (state = otorisasiState, action) => {
  switch (action.type) {
    case actionTypes.OTORISASI_REQUEST:
      return {
        ...state
      };
    case actionTypes.OTORISASI_SUCCESS:
      return {
        ...state,
        otorisasi: action.otorisasi.Data
      };
    default:
      return state;
  }
};

export { menuReducer, detailReducer, otorisasiReducer };
