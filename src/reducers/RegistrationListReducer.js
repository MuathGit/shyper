import constants from '../constants/RegistrationListConstants'

const initialState = {
  searchFields: {
    search: null, // for basic search
  }, // Advanced search fields
  isBasicSearch: true,
  registrations: [],
  totalRecords: 0,
  isLoading: false,
  pageProps: {
    page: 0,
    limit: 10,
    sortDir: null,
    sortCol: null,
  },
  activeUser: null,
  isModalVisible: false,
  showSuccessMessage: false,
  activeRequest: null,
}

const registrationList = (state = initialState, action) => {
  switch (action.type) {
  case constants.UPDATE_SEARCH_FIELDS:
    return {
      ...state,
      searchFields: action.fields,
    }
  case constants.UPDATE_REGISTRATIONS:
    return { ...state, registrations: action.registrations, totalRecords: action.totalRecords }
  case constants.TOGGLE_SEARCH_TYPE:
    return { ...state, isBasicSearch: !state.isBasicSearch }
  case constants.FETCHING:
    return { ...state, isLoading: true }
  case constants.FETCH_COMPLETE:
    return { ...state, isLoading: false }
  case constants.UPDATE_TABLE_PROPS:
    return {
      ...state,
      pageProps: {
        page: action.page,
        limit: action.limit,
        sortDir: action.sortDir,
        sortCol: action.sortCol,
      },
    }
  case constants.SET_ACTIVE_USER:
    return { ...state, activeUser: action.id }
  case constants.SET_MODAL_VISIBLE:
    return { ...state, isModalVisible: action.isVisible }
  case constants.TOGGLE_SUCCESS_MESSAGE_VISIBILTY:
    return { ...state, showSuccessMessage: action.isVisible }
  case constants.SET_ACTIVE_REQUEST:
    return { ...state, activeRequest: action.id }
  default:
    return state
  }
}

export default registrationList
