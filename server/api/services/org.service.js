import orgModel from '../models/organization.model';

const search = (id) => {
    const promise = orgModel.findOne({ orgID: id});
    return promise;  
}

const save = (org) => {
    const promise = new orgModel(org).save();
    return promise;
}


export default {
    search: search,
    save: save
};