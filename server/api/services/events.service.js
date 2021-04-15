import axios from 'axios'
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


const getGoogleCalendarEvents = (accessToken, calendarId) => {

    const endpoint = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
    }
    return axios.get(endpoint, config);
}

const addGoogleCalendarEvent = (accessToken, calendarId, event) => {

    const endpoint = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?sendUpdates=all&sendNotifications=true&conferenceDataVersion=1`
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },

    }
    return axios.post(endpoint, event, config);
}





export default {
    getAllEvents
    , addNewEvent
    , updateEvent
    , deleteEvent
    , getGoogleCalendarEvents
    , addGoogleCalendarEvent
}