import axios from 'axios'
import { doThrowError } from './ErrorActions'
import { AR } from '../constants/LocaleConstants'
import constants from '../constants/PermitRequestManagementConstants'

export const doUpdatePermitRequest = (permitRequestList, totalRecords) => {
  return {
    type: constants.UPDATE_PERMIT_REQUEST,
    permitRequestList,
    totalRecords
  }
}

export const doToggleSearchType = () => {
  return {
    type: constants.TOGGLE_SEARCH_TYPE
  }
}

export const doUpdateSearchFields = (fields) => {
  return {
    type: constants.UPDATE_SEARCH_FIELDS,
    fields
  }
}

export const fetchStarted = () => {
  return {
    type: constants.FETCHING
  }
}

export const fetchFinished = () => {
  return {
    type: constants.FETCH_COMPLETE
  }
}

export const doChangeTableProps = (page, limit, sortCol, sortDir) => {
  return {
    type: constants.UPDATE_TABLE_PROPS,
    page,
    limit,
    sortCol,
    sortDir
  }
}

export const doSetActiveRequest = (id) => {
  return {
    type: constants.SET_ACTIVE_REQUEST,
    id
  }
}

export const doSetPageMode = (pageMode) => {
  return {
    type: constants.SET_PAGE_MODE,
    pageMode
  }
}

export const doShowModal = () => {
  return {
    type: constants.SET_MODAL_VISIBLE,
    isVisible: true
  }
}

export const doDismissModal = () => {
  return {
    type: constants.SET_MODAL_VISIBLE,
    isVisible: false
  }
}

export const doResetSuccessMessage = () => {
  return {
    type: constants.TOGGLE_SUCCESS_MESSAGE_VISIBILTY,
    isVisible: false
  }
}

export const doShowSuccessMessage = () => {
  return {
    type: constants.TOGGLE_SUCCESS_MESSAGE_VISIBILTY,
    isVisible: true
  }
}

export const doSetPermitTypes = (permitTypes) => {
  return {
    type: constants.SET_PERMIT_TYPES,
    permitTypes: permitTypes
  }
}

export const doGetPermitTypes = () => {
  return (dispatch) => {
    axios.get('/api/v1/permitRequest/permitTypes')
    .then(response => {
      dispatch(doSetPermitTypes(response.data))
    })
}
}


export const doFetchPermitRequestIfNeeded = (page, size, sortCol, sortDir) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted())
    dispatch(doChangeTableProps(page, size, sortCol, sortDir))
    const state = getState().permitRequestManagement
    let sortColAndDir = null
    if (sortCol) {
      sortColAndDir = sortDir === 'asc'? sortCol + ',asc' : sortCol + ',desc'
    }
    const pageProps = {page: page, limit: size, sort: sortColAndDir}
    const isBasicSearch = state.isBasicSearch
    var searchOptions = {...state.searchFields, search: null}
    if (isBasicSearch) {
      searchOptions = { search: state.searchFields.search }
    }
    axios.get('/api/v1/permitRequest', {headers: {'Accept': 'application/json'}, params: {...pageProps, ...searchOptions}})
      .then(function(response) {
        if(response.status === 200 && response.data && response.data.content) {
          dispatch(doUpdatePermitRequest(response.data.content, response.data.totalElements))
        }
        else {
          dispatch(doUpdatePermitRequest([], 0))
        }
        dispatch(fetchFinished())
      })
      .catch(function() {
        //TODO set error MESSAGE
        dispatch(doUpdatePermitRequest([], 0))
        dispatch(fetchFinished())
      })
  }
}
