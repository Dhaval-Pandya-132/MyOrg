import userModel from '../models/users.model';
import 'babel-polyfill';

const search = (param) => {
    const promise = userModel.find(param).exec();
    return promise;
}

const user = (id) => {
    const promise = userModel.findOne({ googleID: id});
    return promise;  
}


const login = async (user) => {
    
    const existingUser = await userModel.findOne({googleID: user.googleID});
    if (existingUser) {
        console.log('exiting user');
        return existingUser;
    } else {
        // adding new profile in db
        const { googleID, userName, email, picture} = user;
        console.log('new user');
        return new userModel({googleID,userName,email,picture}).save();
    }
}

export default {
    search: search,
    login: login,
    user: user
};