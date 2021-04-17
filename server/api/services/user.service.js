import userModel from '../models/users.model';
import 'babel-polyfill';

const search = async(id) => {
  const promise = userModel.find({orgID: id}).exec();
  return promise;
}

const user = (id) => {
    const promise = userModel.findOne({ googleID: id});
    return promise;  
}


const login = async (user,orgID) => {
    
    const existingUser = await userModel.findOne({googleID: user.googleID});
    if (existingUser) {
        console.log('exiting user');
        return existingUser;
    } else {
        // adding new profile in db
        const { googleID, userName, email, picture} = user;
        console.log('new user',orgID);
        return new userModel({googleID,userName,email,picture,orgID}).save();
    }
}

export default {
    search: search,
    login: login,
    user: user
};