const selectMenu = state => state.menuReducer.menu;
const selectDetail = state => state.detailReducer.detail;
const selectOtorisasi = state => state.otorisasiReducer.otorisasi;
const selectAttachment = state => state.attachmentReducer.attachment;
const selectForm = state => state.formReducer.form;

export {
  selectMenu,
  selectDetail,
  selectOtorisasi,
  selectAttachment,
  selectForm
};
