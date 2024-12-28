import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
//"http://192.168.140.37:5000api/auth/";

class AuthServ {

  login(userid, password) {
    return axios.post("http://192.168.140.37:5000" + '/api/auth/login', {userid, password});
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(formdata) {
    return axios.post("http://192.168.140.37:5000" + "/api/auth/register", formdata);
  }

  getUserInfo() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : null;
  }

  isAdmin() {
    return this.getUserInfo() ? this.getUserInfo().isadmin : false;
  }
}

export default new AuthServ();
