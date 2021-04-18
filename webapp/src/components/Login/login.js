import React, { useContext, useState } from 'react';
import { Form, Button } from "react-bootstrap";
import './login.scss';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../utils/refreshToken';
import GoogleConfig from './../../apiGoogleconfig';
import Cookies from 'js-cookie';
import UserContext from './../../contexts/UserContext';

const clientId = GoogleConfig.clientId;

function Login(props) {

  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const [isRegister, setisRegister] = useState(false);
  const [orgID, setOrgID] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgPh, setOrgPh] = useState('');
  const [orgAddress, setOrgAddress] = useState('');


  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res);
    refreshTokenSetup(res);
    Cookies.set('tokenId', res.tokenId);
    Cookies.set('accessToken', res.accessToken);
    setIsAuthenticated(true);

    console.log('orgID', orgID);
    fetch('http://localhost:8081/login/' + orgID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'tokenId': res.tokenId
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    props.history.push("dashboard");
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  const orgRegistration = (e) => {
    e.preventDefault();
    const min = 1;
    const max = 10000;
    const tempOrgID = Math.floor(min + (Math.random() * (max - min)));

    fetch('http://localhost:8081/org/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orgName: orgName,
        orgID: tempOrgID,
        email: orgEmail,
        phoneNumber: orgPh,
        address: orgAddress
      }),
    })
      .then(response => {
        if (response.status !== 200) {
          alert("Please enter unique org name and email")
        } else {
          response.json().then(data => {
            console.log('Success:', data);
            reset();
            let x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
          })
        }
      })

  }

  const reset = () => {
    setOrgID('');
    setOrgName('');
    setOrgEmail('');
    setOrgPh('');
    setOrgAddress('');
  }


  return (
    <div className='container'>
      <div id="snackbar">Organisation ID sent your email</div>
      <div className="mb-2">
        <Button onClick={() => { setisRegister(false) }} className={`${isRegister ? 'btn-light' : 'btn-dark'} w-50 rounded-0`}>Login </Button>
        <Button onClick={() => { setisRegister(true) }} className={`${isRegister ? 'btn-dark' : 'btn-light'} w-50 rounded-0`}>Register Organisation</Button>
      </div>

      {isRegister ?
        (<div>

          <Form onSubmit={orgRegistration}>
            <Form.Group>
              <Form.Group controlId="orgName">
                <Form.Control
                  type="text"
                  className="rounded-0"
                  value={orgName}
                  onChange={(e) => { setOrgName(e.target.value) }}
                  placeholder="Enter Organization name"
                  required />
              </Form.Group>

              <Form.Group controlId="orgEmail">
                <Form.Control
                  type="email"
                  className="rounded-0"
                  value={orgEmail}
                  onChange={(e) => { setOrgEmail(e.target.value) }}
                  placeholder="Enter Email"
                  required />
              </Form.Group>
              <Form.Group controlId="orgPh">
                <Form.Control
                  className="rounded-0"
                  value={orgPh}
                  onChange={(e) => { setOrgPh(e.target.value) }}
                  placeholder="Enter Phone Number"
                  required />
              </Form.Group>
              <Form.Group controlId="orgAddress">
                <Form.Control
                  type="text"
                  className="rounded-0"
                  value={orgAddress}
                  onChange={(e) => { setOrgAddress(e.target.value) }}
                  placeholder="Enter Organization Address"
                  required />
              </Form.Group>
            </Form.Group>
            <div>
              <Button type="submit" className="bg-dark w-100 rounded-0">Register</Button>
            </div>
          </Form>
        </div>) :
        (<div>
          <input type="text" name="orgID" value={orgID}
            onChange={(e) => { setOrgID(e.target.value) }} placeholder="Organization ID" required /><br /><br />

          <GoogleLogin
            render={renderProps => (
              <button className="login-btn" onClick={() => {

                fetch('http://localhost:8081/org/' + orgID)
                  .then(response => response.json())
                  .then(data => {
                    console.log('Success:', data);
                    if (data !== null)
                      renderProps.onClick()
                    else {
                      alert('Please enter correct organization ID')
                    }
                  })
                  .catch((error) => {
                    console.log('in error');
                    console.error('Error:', error);
                  });
              }} disabled={renderProps.disabled}>Sign In with Google</button>
            )}

            clientId={clientId}
            buttonText="Sign In with Google"
            scope={'profile email https://www.googleapis.com/auth/calendar'}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={isAuthenticated}
          />
          <p className="login-policy">By Signing up, you agree to our Terms & Private Policy</p>

        </div>)}
    </div>
  );
}

export default Login;