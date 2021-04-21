/* eslint-disable import/no-anonymous-default-export */
import { GET_USERS_BY_GOOGLE_ID } from './constants'


const getUsersByGoogleId = (tokenId, param) => {
    let init = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            tokenId
        },
        userPayload: JSON.stringify(param)
    };
    return fetch(`${GET_USERS_BY_GOOGLE_ID}`, init
    ).then(response => response.json());
}

export default { getUsersByGoogleId }