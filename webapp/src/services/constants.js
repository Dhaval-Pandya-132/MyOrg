import { SERVER_ENDPOINT } from '../global-constants'

export const GET_ALL_EVENT = `${SERVER_ENDPOINT}/events`
export const ADD_EVENT = `${SERVER_ENDPOINT}/event`
export const UPDATE_EVENT = `${SERVER_ENDPOINT}/event`
export const DELETE_EVENT = `${SERVER_ENDPOINT}/event`
export const GET_ALL_GOOGLE_EVENT = `${SERVER_ENDPOINT}/googleEvents`
export const ADD_NEW_GOOGLE_EVENT = `${SERVER_ENDPOINT}/googleEvent`
export const DELETE_GOOGLE_EVENT = `${SERVER_ENDPOINT}/googleEvent`
export const UPDATE_GOOGLE_EVENT = `${SERVER_ENDPOINT}/googleEvent`




// Web-Chat API
export const GET_CONVERSATIONS = `${SERVER_ENDPOINT}/mymessages`
export const UPDATE_CONVERSATIONS = `${SERVER_ENDPOINT}/mymessages`
export const ADD_NEW_CONVERSATIONS = `${SERVER_ENDPOINT}/mymessages`
export const GET_USER = `${SERVER_ENDPOINT}/user`
export const GET_USERS = `${SERVER_ENDPOINT}/`