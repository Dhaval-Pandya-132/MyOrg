import React from 'react';
import './App.scss';
import Login from './Login/login';


class App extends React.Component {

  render(){
    console.log(this.props);
    return(
      <div>
        
        <Login {...this.props}></Login>
      </div>
    );
  }
}

export default App;