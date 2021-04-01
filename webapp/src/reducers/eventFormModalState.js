import { SHOW_MODAL } from './../actions/eventFormModalActions'

const initialState = { modalShow: false };


export const eventFormReducer = (state = initialState, action) => {

    switch (action.type) {
        case SHOW_MODAL:
            return { ...state, modalShow: action.payload }
        default:
            return state;

    }
};
