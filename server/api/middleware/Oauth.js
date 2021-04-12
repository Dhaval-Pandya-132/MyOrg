import {OAuth2Client} from 'google-auth-library';
import 'babel-polyfill';


const clientId = "259512103532-cvvunkt98fmil35ppucov9iu8lcf3mgl.apps.googleusercontent.com";

const client = new OAuth2Client(clientId);

const gooleAuth = async (request, response, next) => {

    try{

        const token = request.headers.tokenid;
    
        const ticket = await client.verifyIdToken({ 
            idToken: token,
            audience: clientId,
        });
        
        const payload = ticket.getPayload();
      
        const {sub, email, name, picture} = payload;
        const userPayload = {
            googleID: sub,
            email: email,
            userName: name,
            picture: picture
        }
        request.userPayload =  userPayload;
        next();

    }catch(error){
        console.log("Verification failed");
        console.log(error);
        return response.status(401).json({
            message: 'Auth failed'
        });
    }
    
}

export default gooleAuth;