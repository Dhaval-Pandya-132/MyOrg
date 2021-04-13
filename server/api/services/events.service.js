import eventModel from '../models/events.model';

/**
 * Get All events
 * @returns 
 */
const getAllEvents = () => {
    const promise = eventModel.find().exec();
    return promise;
}

/**
 * add new events
 * @param {*} param 
 * @returns 
 */
const addNewEvent = (param) => {
    const event = new eventModel(param);
    const promise = event.save();
    return promise;
}

const updateEvent = (id, updatedVal) => {
    const promise = eventModel.findByIdAndUpdate(
        { _id: id },
        updatedVal,
        { new: true }
    ).exec();
    return promise;
}

const deleteEvent = (id) => {
    const promise = eventModel.remove({ _id: id }).exec();
    return promise;
}




export default { getAllEvents, addNewEvent, updateEvent, deleteEvent }