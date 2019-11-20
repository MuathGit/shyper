import constants from '../constants/RegistrationListConstants'
import { AR } from '../constants/LocaleConstants'

export const doUpdateRegistrations = (registrations, totalRecords) => {
  return {
    type: constants.UPDATE_REGISTRATIONS,
    registrations,
    totalRecords,
  }
}

const registrationArray = (counter) => {
  const array = []
  for (var i = 1; i <= counter; i++) {
    const obj = {
      organizationId: i + '' + i + 1 + i + 1 + '' + i + '' + i + 1 + '' + i + '' + i + 1,
      idNumber: '10' + i + '' + i + 2 + i + 2 + '' + i + '' + i + 2 + '' + i + '' + i + 2,
      organizationType: 'government',
      crNumber: null,
      crIssueDate: null,
      crEndDate: null,
      residentsId: '1234556' + i,
      sponsoredNumber: '23255665',
      userType: 'saudi',
      birthDate: '1412-01-01',
      email: 'wss@hotmail.com',
      mobileNumber: '050012212' + i,
      location: false,
      long: '46.681399299999995',
      lat: '24.709729799999998',
      regionEn: null,
      regionAr: null,
      cityEn: null,
      cityAr: 'الرياض',
      districtEn: null,
      districtAr: null,
      streetEn: null,
      streetAr: null,
      postalCode: '25444',
      phoneNumber: '0114433333' + i,
      faxNumber: null,
      agreementForm: null,
      cr: null,
  }
  array.push(obj)
    }
  
  return array
}

export const doToggleSearchType = () => {
  return {
    type: constants.TOGGLE_SEARCH_TYPE,
  }
}

export const doUpdateSearchFields = (fields) => {
  return {
    type: constants.UPDATE_SEARCH_FIELDS,
    fields,
  }
}
export const fetchStarted = () => {
  return {
    type: constants.FETCHING,
  }
}
export const fetchFinished = () => {
  return {
    type: constants.FETCH_COMPLETE,
  }
}
export const doChangeTableProps = (page, limit, sortCol, sortDir) => {
  return {
    type: constants.UPDATE_TABLE_PROPS,
    page,
    limit,
    sortCol,
    sortDir,
  }
}
export const doSetActiveUser = (id) => {
  return {
    type: constants.SET_ACTIVE_USER,
    id,
  }
}
export const doExport = (type) => {
  // return (dispatch, getState) => {
  //   dispatch(fetchStarted())
  //   const mime = type === 'pdf'? 'application/pdf': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  //   const headers = {'Accept': mime}
  //   const locale = getState().locale.currentLocale
  //   const params = {...getSearchCriteria(getState()), locale: locale}
  //   axios.get('/api/vehicles/Export', {params: params, headers: headers, responseType: 'arraybuffer'})
  //   .then((res) => {
  //     dispatch(fetchFinished())
  //     const contentDispositionHeader= res.headers['content-disposition'];
  //     const parts = contentDispositionHeader.split(';');
  //     const filename = parts[1].split('=')[1];
  //     var blob = new Blob([res.data], {type: mime})
  //     FileSaver.saveAs(blob,filename)
  //   }).catch(() => {
  //     dispatch(fetchFinished())
  //   })
  // }
}
export const doFetchRegistrationIfNeeded = (page, size, sortCol, sortDir, firstLoad) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted())
    dispatch(doUpdateRegistrations(registrationArray(3), 0))
    dispatch(fetchFinished())
    // dispatch(fetchStarted())
    // dispatch(doChangeTableProps(page, size, sortCol, sortDir))
    // const state = getState().registrationList
    // let sortColAndDir = null
    // if (sortCol) {
    //   sortColAndDir = sortDir === 'asc' ? sortCol + ',asc' : sortCol + ',desc'
    // }
    // const pageProps = { page, limit: size, sort: sortColAndDir }
    // const isBasicSearch = state.isBasicSearch
    // var searchOptions = {...state.searchFields, search: null}
    // if (isBasicSearch) {
    //   searchOptions = { search: state.searchFields.search }
    // }
    // dispatch(doUpdateRegistrations([], 0))
    // axios.get('/api/vehicles', { headers: {'Accept': 'application/json'}, params: { ...pageProps, ...searchOptions, firstLoad } })
    //   .then(function(response) {
    //     if(response.status === 200 && response.data && response.data.content) {
    //       dispatch(doUpdateRegistrations(response.data.content, response.data.totalElements))
    //     }
    //     else {
    //       dispatch(doUpdateRegistrations([], 0))
    //     }
    //     dispatch(fetchFinished())
    //   })
    //   .catch(function() {
    //     //TODO set error MESSAGE
    //     dispatch(doUpdateRegistrations([], 0))
    //     dispatch(fetchFinished())
    //   })
  }
}
// const getSearchCriteria = (state) => {
//   const { pageProps, searchFields, isBasicSearch } = state.registrationList
//   let sortColAndDir = null
//   if (pageProps.sortCol) {
//     sortColAndDir = pageProps.sortDir === 'asc'? pageProps.sortCol + ',asc' : pageProps.sortCol + ',desc'
//   }
//   const pageable = {page: 0, limit: pageProps.limit, sort: sortColAndDir}
//   var searchOptions = {...searchFields, search: isBasicSearch? searchFields.search: null}
//   return {...searchOptions, ...pageable}
// }
export const doShowModal = () => {
  return {
    type: constants.SET_MODAL_VISIBLE,
    isVisible: true,
  }
}
export const doDismissModal = () => {
  return {
    type: constants.SET_MODAL_VISIBLE,
    isVisible: false,
  }
}
export const doShowSuccessMessage = () => {
  return {
    type: constants.TOGGLE_SUCCESS_MESSAGE_VISIBILTY,
    isVisible: true,
  }
}
export const doResetSuccessMessage = () => {
  return {
    type: constants.TOGGLE_SUCCESS_MESSAGE_VISIBILTY,
    isVisible: false,
  }
}
export const doSetActiveRequest = (id) => {
  return {
    type: constants.SET_ACTIVE_REQUEST,
    id,
  }
}
