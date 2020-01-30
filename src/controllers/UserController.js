import axios from "axios";
import httpClient from "./HttpClient";

class UserController {
  constructor() {
    this.basePath = "/c_auth";
    this.profilePath = "/c_profil";
  }

  login = async (email, password) => {
    try {
      const result = await httpClient.request({
        url: `${this.basePath}/login`,
        method: "POST",
        data: {
          email,
          password,
          token: "",
          token_firebase: "token test",
          device: "ios",
          mac: "mac test",
          app: "A"
        }
      });

      // alert(result.Pesan);

      if (result.Error) {
        return Promise.reject(result.Pesan);
      } else {
        return result;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
  resetPassword = async (conPass, newPass, email) => {
    try {
      const result = await httpClient.request({
        url: `${this.basePath}/resetpass_newlogin`,

        method: "POST",
        data: {
          conpass: conPass,
          newpass: newPass,
          email: email
        }
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  changePassword = async (email, pass, conpass) => {
    try {
      const result = await httpClient.request({
        url: `${this.profilePath}/changePassReact`,
        method: "POST",
        data: {
          email: email,
          password: pass,
          cpassword: conpass
        }
      });

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  saveProfile = async data => {
    try {
      const result = await httpClient.request({
        url: `${this.profilePath}/save`,
        method: "POST",
        data: {
          UserName: data.email,
          Name: data.name,
          Handphone: data.phone,
          Gender: data.gender,
          wherename: data.name
        }
      });

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  logout = () => null;
}

export default new UserController();
