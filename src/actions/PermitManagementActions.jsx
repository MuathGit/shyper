import axios from 'axios'
import { doThrowError } from './ErrorActions'
import { AR } from '../constants/LocaleConstants'
import constants from '../constants/PermitManagementConstants'

export const doUpdatePermit = (permitList, totalRecords) => {
  return {
    type: constants.UPDATE_PERMIT,
    permitList,
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


export const doFetchPermitIfNeeded = (page, size, sortCol, sortDir) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted())
    dispatch(doChangeTableProps(page, size, sortCol, sortDir))
    const state = getState().permitManagement
    let sortColAndDir = null
    if (sortCol) {
      sortColAndDir = sortDir === 'asc'? sortCol + ',asc' : sortCol + ',desc'
    }
    const pageProps = {page: page, limit: size, sort: sortColAndDir}
    const isBasicSearch = state.isBasicSearch
    var searchOptions = {...state.searchFields, basicSearch: null}
    if (isBasicSearch) {
      searchOptions = { basicSearch: state.searchFields.basicSearch }
    }
    axios.get('/api/v1/permit', {headers: {'Accept': 'application/json'}, params: {...pageProps, ...searchOptions}})
      .then(function(response) {
        if(response.status === 200 && response.data && response.data.content) {
          dispatch(doUpdatePermit(response.data.content, response.data.totalElements))
        }
        else {
          dispatch(doUpdatePermit([], 0))
        }
        dispatch(fetchFinished())
      })
      .catch(function() {
        //TODO set error MESSAGE
        dispatch(doUpdatePermit([], 0))
        dispatch(fetchFinished())
      })
  }
}
