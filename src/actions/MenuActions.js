import MenuController from "../controllers/MenuController";

export const actionTypes = {
  MENU: "MENU",
  MENU_REQUEST: "MENU_REQUEST",
  MENU_ERROR: "MENU_ERROR",
  MENU_SUCCESS: "MENU_SUCCESS",

  DETAIL: "DETAIL",
  DETAIL_REQUEST: "DETAIL_REQUEST",
  DETAIL_ERROR: "DETAIL_ERROR",
  DETAIL_SUCCESS: "DETAIL_SUCCESS",

  OTORISASI: "OTORISASI",
  OTORISASI_REQUEST: "OTORISASI_REQUEST",
  OTORISASI_ERROR: "OTORISASI_ERROR",
  OTORISASI_SUCCESS: "OTORISASI_SUCCESS",

  APPROVE: "APPROVE",
  APPROVE_REQUEST: "APPROVE_REQUEST",
  APPROVE_ERROR: "APPROVE_ERROR",
  APPROVE_SUCCESS: "APPROVE_SUCCESS",

  ATTACHMENT: "ATTACHMENT",
  ATTACHMENT_REQUEST: "ATTACHMENT_REQUEST",
  ATTACHMENT_ERROR: "ATTACHMENT_ERROR",
  ATTACHMENT_SUCCESS: "ATTACHMENT_SUCCESS"
};

const menuRequest = () => ({
  type: actionTypes.MENU
});

const menuSuccess = menu => ({
  type: actionTypes.MENU_SUCCESS,
  menu
});

const menuError = error => ({
  type: actionTypes.MENU_ERROR,
  error
});

const detailRequest = () => ({
  type: actionTypes.DETAIL
});

const detailSuccess = detail => ({
  type: actionTypes.DETAIL_SUCCESS,
  detail
});

const detailError = error => ({
  type: actionTypes.DETAIL_ERROR,
  error
});

const otorisasiRequest = () => ({
  type: actionTypes.OTORISASI
});

const otorisasiSuccess = otorisasi => ({
  type: actionTypes.OTORISASI_SUCCESS,
  otorisasi
});

const otorisasiError = error => ({
  type: actionTypes.OTORISASI_ERROR,
  error
});

const approveRequest = () => ({
  type: actionTypes.APPROVE
});

const approveSuccess = approve => ({
  type: actionTypes.APPROVE_SUCCESS,
  approve
});

const approveError = error => ({
  type: actionTypes.APPROVE_ERROR,
  error
});

const attachmentRequest = () => ({
  type: actionTypes.ATTACHMENT
});

const attachmentSuccess = attachment => ({
  type: actionTypes.ATTACHMENT_SUCCESS,
  attachment
});

const attachmentError = error => ({
  type: actionTypes.ATTACHMENT_ERROR,
  error
});

export const getMenu = userId => async dispatch => {
  dispatch(menuRequest());
  try {
    const menu = await MenuController.getMenu(userId);
    dispatch(menuSuccess(menu));
  } catch (error) {
    dispatch(menuError(error));
  }
};

export const getDetail = (userId, approval_id) => async dispatch => {
  dispatch(detailRequest());
  try {
    const detail = await MenuController.getDetail(userId, approval_id);

    dispatch(detailSuccess(detail));
  } catch (error) {
    dispatch(detailError(error));
  }
};

export const getOtorisasi = (entity, docNo, modules) => async dispatch => {
  dispatch(otorisasiRequest());

  try {
    const otorisasi = await MenuController.getOtorisasi(entity, docNo, modules);

    dispatch(otorisasiSuccess(otorisasi));
  } catch (error) {
    dispatch(otorisasiError(error));
  }
};

export const getAttachment = (entity, docNo, type) => async dispatch => {
  dispatch(attachmentRequest());
  try {
    const attachment = await MenuController.getAttachment(entity, docNo, type);
    dispatch(attachmentSuccess(attachment));
  } catch (error) {
    dispatch(attachmentError(error));
  }
};

export const approve = (
  status,
  data,
  UserId,
  approval_id,
  trx_type,
  approve_seq,
  level_no
) => async dispatch => {
  dispatch(approveRequest());

  try {
    const approve = await MenuController.setApprove(
      status,
      data,
      UserId,
      approval_id,
      trx_type,
      approve_seq,
      level_no
    );
    console.log("approve", approve);
    alert(approve.Pesan);
    dispatch(approveSuccess(approve));

    const menu = await MenuController.getMenu(UserId);
    menu.Data[0].total_doc;
    dispatch(menuSuccess(menu));
  } catch (error) {
    dispatch(approveError(error));
  }
};
