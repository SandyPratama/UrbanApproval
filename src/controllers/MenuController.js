import axios from "axios";
import httpClient from "./HttpClient";

class MenuController {
  constructor() {
    // this.basePath = '/c_menu';
    this.appPath = "/c_approval";
  }

  getSearch = async query => {
    try {
      const result = await httpClient.request({
        url: `${this.appPath}/viewMenu?q=${query.toLowerCase()}`,
        method: "GET"
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getMenu = async userId => {
    try {
      const result = await httpClient.request({
        url: `${this.appPath}/groupMenu`,
        method: "POST",
        data: {
          approval_user: userId
        }
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getDetail = async (app_user, approval_id) => {
    try {
      const result = await httpClient.request({
        url: `${this.appPath}/viewMenu`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          approval_user: app_user,
          approval_id: approval_id
        }
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getOtorisasi = async (entity, docNo) => {
    try {
      const result = await httpClient.request({
        url: `${this.appPath}/otorisasi`,
        method: "POST",
        data: {
          entity_cd: entity,
          doc_no: docNo
        }
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getAttachment = async (entity, docNo) => {
    try {
      const result = await httpClient.request({
        url: `${this.appPath}/getAttachment`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          entity_cd: entity,
          doc_no: docNo
          // type: type
        }
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getForm = async (entity, docNo) => {
    try {
      const result = await httpClient.request({
        url: `${this.appPath}/getForm`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          entity_cd: entity,
          doc_no: docNo
          // type: type
        }
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  setApprove = async (status, data) => {
    try {
      const result = await httpClient.request({
        url: `${this.appPath}/updateApproval/${status}`,
        method: "POST",
        data: {
          entity_cd: data.entity_cd,
          doc_no: data.doc_no,
          status,
          doc_date: data.doc_date,
          remarks: data.reason_remarks,
          approval_id: data.approval_id,
          trx_type: data.trx_type,
          approve_seq: data.approve_seq,
          level_no: data.level_no,
          approval_user: data.approval_user
        }
      });

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default new MenuController();
