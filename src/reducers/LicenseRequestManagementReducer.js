import constants from '../constants/LicenseRequestManagementConstants'

const initialState = {
  searchFields: {
    search: null, //for basic search
    requestNumber: null,
    licenseType: null,
    requestType: null,
    crNumber: null,
    branchName: null,
    corporateName: null,
    requestStatus: null,
    role: null,
  }, //Advanced search fields
  isBasicSearch: true,
  licenses: [],
  totalRecords: 0,
  isLoading: false,
  pageProps: {
    page: 0,
    limit: 10,
    sortDir: 'asc',
    sortCol: 'requestStatus'
  },
  activeRequest: null,
  isModalVisible: false,
  showSuccessMessage: false,
  counter:1,
}

const licenseRequestManagement = (state = initialState, action) => {
  switch(action.type) {
    case constants.UPDATE_SEARCH_FIELDS:
      return {
        ...state,
        searchFields: action.fields
      }
    case constants.UPDATE_LICENSE_REQUEST:
      return {...state, licenses: action.licenses, totalRecords: action.totalRecords}
    case 'INCREMENT':
    return {...state,counter:state.counter+1}
    case constants.TOGGLE_SEARCH_TYPE:
      return {...state,
         isBasicSearch: !state.isBasicSearch,
         searchFields: {
           search: null, //for basic search
           requestNumber: null,
           licenseType: null,
           requestType: null,
           crNumber: null,
           branchName: null,
           corporateName: null,
           requestStatus: null,
           role: null,
         },
      }
    case constants.FETCHING:
      return {...state, isLoading: true}
    case constants.FETCH_COMPLETE:
      return {...state, isLoading: false}
    case constants.UPDATE_TABLE_PROPS:
      return {...state, pageProps: {
        page: action.page,
        limit: action.limit,
        sortDir: action.sortDir,
        sortCol: action.sortCol
      }}
    case constants.SET_ACTIVE_REQUEST:
      return {...state, activeRequest: action.id}
    case constants.SET_MODAL_VISIBLE:
      return {...state, isModalVisible: action.isVisible}
    case constants.TOGGLE_SUCCESS_MESSAGE_VISIBILTY:
      return {...state, showSuccessMessage: action.isVisible}
    default:
      return state
  }
}

export default licenseRequestManagement
