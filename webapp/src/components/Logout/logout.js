import React from 'react';
import { GoogleLogout } from 'react-google-login';
import GoogleConfig from './../../apiGoogleconfig';

const clientId = GoogleConfig.clientId;


function Logout(props) {
  const onSuccess = () => {
    console.log('Logout made successfully');
    props.history.push("signup");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        scope= {'profile email https://www.googleapis.com/auth/calendar'}
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;