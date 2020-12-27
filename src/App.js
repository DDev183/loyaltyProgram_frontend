import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import LoginForm from './components/loginForm.js';
import Register from './components/registration.js';
import Menu from './components/Menu.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Axios from 'axios';



class App extends React.Component {


state = {
  logging: localStorage.getItem('logging') === 'true',
  username: '',
  adminRole: false,
  AccessToken: '',
  RefreshToken: '',
  trigger: false
}


updateLoggingState () {
  console.log("TEST!!!!!!");
    this.setState({logging: true});
    console.log(this.state.AccessToken);
    this.setState({AccessToken: localStorage.getItem('AccessToken')});
    this.setState({RefreshToken: localStorage.getItem('RefreshToken')});


}




componentDidUpdate() {


  if (this.state.logging != true) {

  var data = {
      token: localStorage.getItem('AccessToken')
  }

  const axiosConfig = {
      headers: {

          'Content-Type': 'application/json',


      }

  }




  Axios.post('http://127.0.0.1:8000/auth/jwt/verify/', JSON.stringify(data), axiosConfig)
  .then(response => {

      console.log("HTTP AUTH STATUS: " + response.status);
      console.log("Id: " + response.data.id);
      console.log("Email: " + response.data.email);

      if (response.status == 200){
        console.log("TOKEN IS VALID!")
        localStorage.setItem('AccessToken', response.data.access);
        localStorage.setItem('RefreshToken', response.data.refresh);
        this.setState({AccessToken: response.data.access});
        this.setState({RefreshToken: response.data.refresh});




    }
  })
  .catch(response => {

    console.log("TOKEN INVALID");

              var data2 = {
                  refresh: localStorage.getItem('RefreshToken')
              }

                Axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', JSON.stringify(data2), axiosConfig)
                .then(response => {


                  console.log("GET NEW");




                    if (response.status == 200){
                      localStorage.setItem('AccessToken', response.data.access);
                      this.setState({AccessToken: response.data.access});
                      this.setState({trigger: !this.state.trigger});


                    } else {
                      this.setState({logging: false});
                      localStorage.setItem('logging', false);

                    }

                })





    })

  }



}




render() {

 if (this.state.logging == true){
  return (


    <div className="App">

      <header className="App-header-menu">
      <Router>
      <Switch>
        <Route path="/">
        <div class="container-fluid">
        <div class="row">

        <div class="col-sm-12">
          <Menu />
        </div>


        </div>
        </div>
        </Route>
        <Route path="/registration">
        <div class="container-fluid">
        <div class="row">
        <div class="col-sm text-color1">

        </div>
        <div class="col-sm">
          <p> TEST #2 </p>
        </div>

        <div class="col-sm text-color1">

        </div>

        </div>
        </div>
        </Route>
      </Switch>

</Router>
</header>

    </div>

  );
}

 else {
  return (
    <div className="App">

      <header className="App-header">
      <Router>
      <Switch>
        <Route exact path="/">
        <div class="container-fluid">
        <div class="row">
        <div class="col-sm text-color1">

        </div>
        <div class="col-sm">
          <LoginForm updateLoggingState={() => this.updateLoggingState()}/>
        </div>

        <div class="col-sm text-color1">

        </div>

        </div>
        </div>
        </Route>
        <Route path="/registration">
        <div class="container-fluid">
        <div class="row">
        <div class="col-sm text-color1">

        </div>
        <div class="col-sm">
          <Register />
        </div>

        <div class="col-sm text-color1">

        </div>

        </div>
        </div>
        </Route>
      </Switch>

</Router>
</header>

    </div>
  );
}
}
}

export default App;
