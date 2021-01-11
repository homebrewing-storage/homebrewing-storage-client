
import history from './history';
import axios from "axios";

const API_URL = "http://localhost/api/";



export default class Auth {

  userProfile = {};
  message = {};
  
  login = (data) => {
    
      return axios.get('http://localhost/sanctum/csrf-cookie').then(axios.post(API_URL + "login", { email: data.email, password: data.password})
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            this.getUserBoard().then((res) => {
              if(res.status < 400){
                setTimeout(() => { history.replace('/authcheck') }, 800)
                setTimeout(() => { window.location.reload() }, 1200)
              }
            })
          }
          return response;
        }).catch(err => { 
          this.message = err.response
          return err.response
        })   
      ).catch(err => { 
        this.message = err.response
        return err.response
      })
   
  }

  register = (data) => {


      axios.defaults.withCredentials = true;
      axios.get('http://localhost/sanctum/csrf-cookie')
      .then(res => {
        axios.post(API_URL + "register", data)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          return true;
        })
      }).catch(err => { return false })
     
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
      return response
    }).catch(err => {return err.response})
  
  }

  getUser() {
    if(localStorage.getItem('user')){
      const user = localStorage.getItem('user')
      return user
    } else {
      return null
    }
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