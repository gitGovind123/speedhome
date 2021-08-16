export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export function changeLanguage (langFunction) {
  return dispatch => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: langFunction
    })
  }
}
