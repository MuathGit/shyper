import axios from 'axios'
 import constants from '../constants/RoleManagementConstants'

 export const doUpdateRole = (roleList, totalRecords) => {
   return {
     type: constants.UPDATE_ROLE,
     roleList,
     totalRecords,
   }
 }

 export const doUpdateSearchFields = (fields) => {
   return {
     type: constants.UPDATE_SEARCH_FIELDS,
     fields
   }
 }

 export const doToggleSearchType = () => {
  return {
    type: constants.TOGGLE_SEARCH_TYPE
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

 export const doSetActiveRole = (id) => {
   return {
     type: constants.SET_ACTIVE_ROLE,
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


 export const doFetchRolesIfNeeded = (page, size, sortCol, sortDir) => {
   return (dispatch, getState) => {
     dispatch(fetchStarted())
     dispatch(doChangeTableProps(page, size, sortCol, sortDir))
     const state = getState().roleManagement
     let sortColAndDir = null
     if (sortCol) {
       sortColAndDir = sortDir === 'asc'? sortCol + ',asc' : sortCol + ',desc'
     }
     const pageProps = {page: page, limit: size, sort: sortColAndDir}
     const isBasicSearch = state.isBasicSearch
     var searchOptions = {...state.searchFields, generalSearch: null}
     if (isBasicSearch) {
      searchOptions = { generalSearch: state.searchFields.generalSearch }
    }
     axios.get('/api/v1/roles/getAllRoles', {headers: {'Accept': 'application/json'},
     params: {...pageProps, ...searchOptions,}})
       .then(function(response) {
         if(response.status === 200 && response.data && response.data.content && response.data.content.length > 0) {
           dispatch(doUpdateRole(response.data.content, response.data.totalElements))
         }
         else {
           dispatch(doUpdateRole([], 0,true))
         }
         dispatch(fetchFinished())
       })
       .catch(function(error) {
         //TODO set error MESSAGE
         dispatch(doUpdateRole([], 0,true))
         dispatch(fetchFinished())

       })
   }
 }
 // const getSearchCriteria = (state) => {
 //   const { pageProps, searchFields, isBasicSearch} = state.roleManagement
 //   let sortColAndDir = null
 //   if (pageProps.sortCol) {
 //     sortColAndDir = pageProps.sortDir === 'asc'? pageProps.sortCol + ',asc' : pageProps.sortCol + ',desc'
 //   }
 //   const pageable = {page: 0, limit: pageProps.limit, sort: sortColAndDir}
 //   var searchOptions = {...searchFields, generalSearch: isBasicSearch? searchFields.generalSearch: null}
 //   return {...searchOptions, ...pageable}
 // }
