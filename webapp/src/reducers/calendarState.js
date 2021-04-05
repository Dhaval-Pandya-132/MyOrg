import {
    GET_ALL_EVENTS,
    ADD_NEW_EVENTS
} from './../actions/calendarActions'


const initialState = {
    eventList: []
};


export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_EVENTS:
            return state
        case ADD_NEW_EVENTS:
            let { eventList } = { ...state };
            eventList.push(action.payload);
            return { ...state, eventList: eventList }
        default:
            return state;

    }
};
