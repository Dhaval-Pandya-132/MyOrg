export const SHOW_MODAL = "SHOW_MODAL";

export const showAndHideModal = (dispatch, payload) => {
    dispatch({ type: SHOW_MODAL, payload })
}