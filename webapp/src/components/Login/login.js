import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../utils/refreshToken';
import GoogleConfig from './../../apiGoogleconfig';

const clientId = GoogleConfig.clientId;

function Login(props) {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res);
    refreshTokenSetup(res);
    props.history.push("dashboard");
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        scope= {'profile email https://www.googleapis.com/auth/calendar'}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
       
      />
    </div>
  );
}

export default Login;