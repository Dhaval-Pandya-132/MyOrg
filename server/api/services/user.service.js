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

const profile = (user,profile)=>{
    console.log(profile);
    user.lastModifiedDate = new Date();
    user.phoneNumber = profile.phoneNumber;
    user.address = profile.address;
    user.role = profile.role;
    user.managerName = profile.managerName;
    const promise = userModel.findOneAndUpdate(
        { googleID: user.googleID },
        user,
        {new: true}
    ).exec();
    return promise;

}

export default {
    search: search,
    login: login,
    user: user,
    profile: profile
};