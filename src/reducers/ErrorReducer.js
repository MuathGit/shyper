
const initialState = {
  error: null,
}

const errorMessage = (state = initialState, action) => {
  if (action.type === 'RESET_ERROR_MESSAGE') {
    return { ...state, error: null }
  } else if(action.error) {
    return { ...state, error: action.error }
  }
  return state
}

export default errorMessage
