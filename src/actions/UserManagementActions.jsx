/**
 * @Date:   12-12-2017
 * @Project: GACA - PERMITS
 * @Last modified time: 15-12-2017
 */



import axios from 'axios'
import { doThrowError } from './ErrorActions'
import { AR } from '../constants/LocaleConstants'
import constants from '../constants/UserManagementConstants'

export const doUpdateUsers = (users, totalRecords) => {
  return {
    type: constants.UPDATE_USERS,
    users,
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

export const doSetActiveUser = (id) => {
  return {
    type: constants.SET_ACTIVE_USER,
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

export const onLockUnlockUser = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted())
    const state = getState().userManagement
    const locale = getState().locale.currentLocale
    const {page, limit, sortCol, sortDir} = state.pageProps
    axios.patch('/api/v1/users/' + data.id,{
      userStatus:data.userStatus === 'ACTIVE' ? 'LOCKED' : 'ACTIVE',
    })
    .then(() => {
      dispatch(doFetchUsersIfNeeded(page, limit, sortCol, sortDir))
    })
    .catch(err => {
      if(err.data && err.response && err.response.data) {
        if (locale === AR) {
          dispatch(doThrowError(err.response.data.arabicMessage))
          dispatch(fetchFinished())
        } else {
          dispatch(doThrowError(err.response.data.message))
          dispatch(fetchFinished())
        }
      }
    })
  }
}


export const doDeleteUser = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted())
    dispatch(doDismissModal())
    const state = getState().userManagement
    const {page, limit, sortCol, sortDir} = state.pageProps
    axios.delete('/api/v1/users/' + id)
    .then(() => {
      dispatch(doFetchUsersIfNeeded(page, limit, sortCol, sortDir))
      dispatch(doShowSuccessMessage())
      dispatch(fetchFinished())
    })
    .catch(err => {
      console.log('err.response.data', err.response)
      dispatch(doThrowError(err.response.data.message))
      dispatch(fetchFinished())
    })
  }
}


export const doFetchUsersIfNeeded = (page, size, sortCol, sortDir) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted())
    dispatch(doChangeTableProps(page, size, sortCol, sortDir))
    const state = getState().userManagement
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
    axios.get('/api/v1/users', {headers: {'Accept': 'application/json'}, params: {...pageProps, ...searchOptions}})
      .then(function(response) {
        if(response.status === 200 && response.data && response.data.content) {
          dispatch(doUpdateUsers(response.data.content, response.data.totalElements))
        }
        else {
          dispatch(doUpdateUsers([], 0))
        }
        dispatch(fetchFinished())
      })
      .catch(function() {
        //TODO set error MESSAGE
        dispatch(doUpdateUsers([], 0))
        dispatch(fetchFinished())
      })
  }
}

// const getSearchCriteria = (state) => {
//   const { pageProps, searchFields, isBasicSearch } = state.userManagement
//   let sortColAndDir = null
//   if (pageProps.sortCol) {
//     sortColAndDir = pageProps.sortDir === 'asc'? pageProps.sortCol + ',asc' : pageProps.sortCol + ',desc'
//   }
//   const pageable = {page: 0, limit: pageProps.limit, sort: sortColAndDir}
//   var searchOptions = {...searchFields, search: isBasicSearch? searchFields.search: null}
//   return {...searchOptions, ...pageable}
// }
