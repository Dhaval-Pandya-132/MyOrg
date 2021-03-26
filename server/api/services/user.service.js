import userModel from '../models/users.model';

const search = (param) => {
    const promise = userModel.find(param).exec();
    return promise;
}

export default { search };