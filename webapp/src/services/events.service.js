import {
    ADD_EVENT
    , GET_ALL_EVENT
    , UPDATE_EVENT
    , DELETE_EVENT
    , GET_ALL_GOOGLE_EVENT
} from './constants'


const getAllEvents = (tokenId) => {
    let init = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
    };
    return fetch(`${GET_ALL_EVENT}`, init).then(response => response.json());
}

const addEvent = (tokenId, event) => {
    let init = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
        body: JSON.stringify(event)
    };
    return fetch(`${ADD_EVENT}`, init
    ).then(response => response.json());
}


const updateEvent = (eventId, tokenId, event) => {
    let init = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
        body: JSON.stringify(event)
    };
    return fetch(`${UPDATE_EVENT}/${eventId}`, init
    ).then(response => response.json());
}

const deleteEvent = (eventId, tokenId) => {
    let init = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            tokenId
        }
    };
    return fetch(`${DELETE_EVENT}/${eventId}`, init
    ).then(response => response.json());
}

const getAllGoogleCalendarEvents = (tokenId, accessToken) => {
    let init = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            tokenId,
            accessToken
        },
    };
    return fetch(`${GET_ALL_GOOGLE_EVENT}`, init).then(response => response.json());
}



// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllEvents
    , addEvent
    , updateEvent
    , deleteEvent
    , getAllGoogleCalendarEvents
};