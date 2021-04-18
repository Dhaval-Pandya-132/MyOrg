import React from 'react';
import './App.scss';
import Login from './Login/login';


class App extends React.Component {

  render() {
    return (
      <div className="root-container">
        <h1 >My Organization</h1>
        <Login {...this.props}></Login>
      </div>
    );
  }
}

export default App;