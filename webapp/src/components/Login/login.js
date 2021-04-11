import React, {useContext} from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../utils/refreshToken';
import GoogleConfig from './../../apiGoogleconfig';
import Cookies from 'js-cookie';
import UserContext from './../../contexts/UserContext';

const clientId = GoogleConfig.clientId;

function Login(props) {

  const { setIsAuthenticated } = useContext(UserContext);

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res);
    refreshTokenSetup(res);
    Cookies.set('accessToken', res.accessToken); 
    setIsAuthenticated(true);
    props.history.push("dashboard");
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign In with Google"
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