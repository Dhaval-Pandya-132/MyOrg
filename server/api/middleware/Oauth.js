import { OAuth2Client } from 'google-auth-library';
import 'babel-polyfill';


const clientId = "259512103532-cvvunkt98fmil35ppucov9iu8lcf3mgl.apps.googleusercontent.com";
//const clientId = "266965666446-bn9hn1tlljqi0hpk0lskcm0cqmvfam2d.apps.googleusercontent.com";


const client = new OAuth2Client(clientId);

const gooleAuth = async (request, response, next) => {

    try {

        const token = request.headers.tokenid;
        console.log("request.headers", request.headers)
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });

        const payload = ticket.getPayload();
        console.log("payload --->", payload);
        const { sub, email, name, picture } = payload;
        const userPayload = {
            googleID: sub,
            email: email,
            userName: name,
            picture: picture
        }
        request.userPayload = userPayload;
        next();

    } catch (error) {
        console.log("Verification failed");
        console.log(error);
        return response.status(401).json({
            message: 'Auth failed'
        });
    }

}

export default gooleAuth;