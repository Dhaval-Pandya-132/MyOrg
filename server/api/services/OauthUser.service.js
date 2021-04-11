import {OAUTH2Client} from 'google-auth-library';
import GoogleConfig from './../apiGoogleconfig';

const clientId = GoogleConfig.clientId;

const client = new OAuth2Client(clientId);

const gooleAuth = async (token) => {
    const ticket = await client.verifyIdToken({ 
        idToken: token,
        audience: clientId,
    });
    const payload = ticket.getPayload();

    console.log(payload);

}

export default gooleAuth;