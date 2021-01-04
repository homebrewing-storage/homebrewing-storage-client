
import history from './history';
import axios from "axios";
import * as ACTIONS from '../store/actions/actions';

const API_URL = "http://localhost/api/";



export default class Auth {

  userProfile = {};
  
  
  
  login = (data) => {
    
    
    
    axios.defaults.withCredentials = true;
    const request = () => axios.get('http://localhost/sanctum/csrf-cookie');

    try{
      return request.then(axios.post(API_URL + "login", { email: data.email, password: data.password})
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            this.getUserBoard().then(() => {
              setTimeout(() => { history.replace('/authcheck') }, 800)
              setTimeout(() => { window.location.reload() }, 1200)
            });
          }
          return response
        })   
      )
  } catch (err) {
    return err
}
    
    
  };

  register = (data) => {
    axios.defaults.withCredentials = true;
    try {
      axios.get('http://localhost/sanctum/csrf-cookie').then(
        axios.post(API_URL + "register", data).then(res => {
          return res
        })
      )
    } catch(err) {
      return err
    }
  }

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
      localStorage.setItem("user", JSON.stringify(response.data))
    })
    
  }

  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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