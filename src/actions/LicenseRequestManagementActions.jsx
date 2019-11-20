import constants from '../constants/LicenseRequestManagementConstants'

export const doUpdateLicenseRequest = (licenses, totalRecords) => ({
  type: constants.UPDATE_LICENSE_REQUEST,
  licenses,
  totalRecords,
})

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

export const doSetActiveRequest = (id) => {
  return {
    type: constants.SET_ACTIVE_REQUEST,
    id,
  }
}

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

export const doResetSuccessMessage = () => {
  return {
    type: constants.TOGGLE_SUCCESS_MESSAGE_VISIBILTY,
    isVisible: false,
  }
}

export const doShowSuccessMessage = () => {
  return {
    type: constants.TOGGLE_SUCCESS_MESSAGE_VISIBILTY,
    isVisible: true,
  }
}

export const doIncrement = () => {
  return {
    type: 'INCREMENT',
  }
}

const licenseArray = (counter) =>{
    let array = []
    for(var i = 1;i<=counter;i++){
      const obj = {
        requestNumber:i,
        driverType:'Owner',
        driverId:i+''+i+1+i+1+''+i+''+i+1+''+i+''+i+1,
        driverName: 'محمد عبدالرحمن الصبيح',
        squanceNumber:'NHR26K'+i+'KXS8'+i+'L',
        vehicalModel: i + ' Series',
        vehicalMaker:'BMW',
        createdAt:'1439-10-0'+i,
        plateNo: i + ' أ ك ق',
        plateType: 'خصوصي',
        color: 'Grey',
        expiryDate: '13-11-1439',
        modelYear: '201'+i,
        LicenseActictityNo: '1020301050K',
        startDate: '17-10-1439',
        endDate: '17-10-1440',
        licenseDuration:'OneYear',
        deliveryActivties: [
          {
            id: '0', nameAr: 'توصيل خفيف', nameEn: 'Light Delivery', checked: false, show: true,
          },
          {
            id: '1', nameAr: 'توصيل ثقيل', nameEn: 'Heavy Delivery', checked: true, show: true,
          },
          {
            id: '2', nameAr: 'توصيل طعام', nameEn: 'Food Delivery', checked: true, show: true,
          },
        ],
       }
        array.push(obj)
    }
    return array
}
// const licesneTest = [
//     {
//      reuqestNumber:'123456',
//      driverType:'Owner',
//      name:'Mohammed Alsabih',
//      vehicalModel:'BMW',
//     }
// ]


export const doFetchLicenseRequestIfNeeded = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted())
    //dispatch(doChangeTableProps(page, size, sortCol, sortDir))
    const state = getState().licenseRequestManagement
    let counter = getState().licenseRequestManagement.counter
    dispatch(doUpdateLicenseRequest(licenseArray(counter),0))
    dispatch(fetchFinished())
    // let sortColAndDir = null
    // if (sortCol) {
    //   sortColAndDir = sortDir === 'asc'? sortCol + ',asc' : sortCol + ',desc'
    // }
    // const pageProps = { page: page, limit: size, sort: sortColAndDir }
    // const isBasicSearch = state.isBasicSearch
    // var searchOptions = { ...state.searchFields, generalSearch: null }
    // if (isBasicSearch) {
    //   searchOptions = { generalSearch: state.searchFields.generalSearch }
    // }
    // axios.get('/api/v1/permitRequest', { headers: { Accept: 'application/json' }, params: { ...pageProps, ...searchOptions } })
    //   .then(function(response) {
    //     if(response.status === 200 && response.data && response.data.content) {
    //       dispatch(doUpdateLicenseRequest(response.data.content, response.data.totalElements))
    //     }
    //     else {
    //       dispatch(doUpdateLicenseRequest([], 0))
    //     }
    //     dispatch(fetchFinished())
    //   })
    //   .catch(function() {
    //     //TODO set error MESSAGE
    //     dispatch(doUpdateLicenseRequest([], 0))
    //     dispatch(fetchFinished())
    //   })
  }
}
