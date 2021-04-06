export const GET_ALL_EVENTS = "GET_ALL_EVENTS";
export const ADD_NEW_EVENTS = "ADD_NEW_EVENTS";
export const UPDATE_NEW_EVENTS = "UPDATE_NEW_EVENTS";
export const DELETE_EVENT = "DELETE_EVENT";


export const getAllEvents = (dispatch, payload) => {
    dispatch({ type: GET_ALL_EVENTS, payload })
}


export const addNewEvent = (dispatch, payload) => {
    dispatch({ type: ADD_NEW_EVENTS, payload })
}