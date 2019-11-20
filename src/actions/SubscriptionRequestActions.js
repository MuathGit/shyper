/**
 * @Date:   25-10-2017
 * @Project: GACA - PERMITS
 * @Last modified time: 27-11-2017
 */



 import axios from 'axios'
 import constants from '../constants/SubscriptionRequestConstants'

 export const doUpdateSubscriptionRequest = (subscriptionRequestList, totalRecords,showErrorMessage) => {
   return {
     type: constants.UPDATE_SUBSCRIPTION_REQUEST,
     subscriptionRequestList,
     totalRecords,
     showErrorMessage,
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

 export const doFetchSubscriptionRequestIfNeeded = (page, size, sortCol, sortDir) => {
   return (dispatch, getState) => {
     dispatch(fetchStarted())
     dispatch(doChangeTableProps(page, size, sortCol, sortDir))
     const state = getState().subscriptionRequestManagement
     let sortColAndDir = null
     if (sortCol) {
       sortColAndDir = sortDir === 'asc'? sortCol + ',asc' : sortCol + ',desc'
     }
     const pageProps = {page: page, limit: size, sort: sortColAndDir}
     var searchOptions = {...state.searchFields, search: null}
     axios.get('/api/subscription/listOfSubscriptionRequests', {headers: {'Accept': 'application/json'},
     params: {...pageProps, ...searchOptions,}})
       .then(function(response) {
         if(response.status === 200 && response.data && response.data.content && response.data.content.length > 0) {
           dispatch(doUpdateSubscriptionRequest(response.data.content, response.data.totalElements,false))
         }
         else {
           dispatch(doUpdateSubscriptionRequest([], 0,true))
         }
         dispatch(fetchFinished())
       })
       .catch(function(error) {
         //TODO set error MESSAGE
         dispatch(doUpdateSubscriptionRequest([], 0,true))
         dispatch(fetchFinished())

       })
   }
 }

//  const getSearchCriteria = (state) => {
//    const { pageProps, searchFields} = state.subscriptionRequestManagement
//    let sortColAndDir = null
//    if (pageProps.sortCol) {
//      sortColAndDir = pageProps.sortDir === 'asc'? pageProps.sortCol + ',asc' : pageProps.sortCol + ',desc'
//    }
//    const pageable = {page: 0, limit: pageProps.limit, sort: sortColAndDir}
//    var searchOptions = {...searchFields}
//    return {...searchOptions, ...pageable}
//  }
