const selectMenu = state => state.menuReducer.menu;
const selectDetail = state => state.detailReducer.detail;
const selectOtorisasi = state => state.otorisasiReducer.otorisasi;
const selectAttachment = state => state.attachmentReducer.attachment;

export { selectMenu, selectDetail, selectOtorisasi, selectAttachment };
