import React from 'react';
import './App.scss';
import Login from './Login/login';


class App extends React.Component {

  render(){
    console.log(this.props);
    return(
      <div className="container">
        
        <Login {...this.props}></Login>
        <p className="login-policy">By Signing up, you agree to our Terms & Private Policy</p>
        
      </div>
    );
  }
}

export default App;