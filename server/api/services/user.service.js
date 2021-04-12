import userModel from '../models/users.model';

const search = (param) => {
    const promise = userModel.find(param).exec();
    return promise;
}

const test = () => {
    const promise = {
        message:"Authenticate"
    }
    return promise;
}


export default {
     search: search,
     test: test
    };