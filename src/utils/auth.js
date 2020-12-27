
import history from './history';
import axios from "axios";
import * as ACTIONS from '../store/actions/actions';

const API_URL = "http://localhost/api/";


export default class Auth {

  userProfile = {};
  
  login = (data) => {
    
    console.log(data);
    axios.defaults.withCredentials = true;

    return axios.get('http://localhost/sanctum/csrf-cookie')
    .then(res => {
      axios.post(API_URL + "login", { email: data.email, password: data.password})
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          setTimeout(() => { history.replace('/authcheck') }, 600);
          setTimeout(() => { window.location.reload() }, 1200);
        }
        return response.data.token;
      });
      
    }).catch(err => console.log(err))
    
  };

  getCurrentToken = () => {
    if(localStorage.getItem("token")) {
      const accessToken = localStorage.getItem("token");
      return accessToken
    } else {
      return null;
    }
    
  };

  authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: this.authHeader() })
    .then(response => {
      return response
    })
    
  }

  logout = () => {
    localStorage.removeItem('token')
    setTimeout(() => { history.replace('/authcheck') }, 600);
    setTimeout(() => { window.location.reload() }, 1200);
    
  }

  isAuthenticated = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if(token){
      return true
    } else {
      return false
    }
  }

}