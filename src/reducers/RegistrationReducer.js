import constants from '../constants/RegistrationConstants'
const initialState = {
    RegistrationFields: {
        organizationType:'government',
        registerByTypes: 'iqamaId',
        organizationId:null,
        crNumber: null,
        crIssueDate: null,
        crEndDate: null,
        residentsId: null,
        sponsoredNumber: null,

        userType: 'saudi',
        idNumber: null,
        birthDate: null,
        email: null,
        mobileNumber: null,

        location:false,
        long: null,
        lat: null,
        regionEn: null,
        regionAr: null,
        cityEn: null,
        cityAr: null,
        districtEn: null,
        districtAr: null,
        streetEn: null,
        streetAr: null,
        postalCode: null,
        phoneNumber: null,
        faxNumber: null,


        termsAndConditions: false,
        agreementForm:null,
        cr:null,
    },
    registrationList:[],
     valiadationErrors: {},
     submitted:false,
    isModalDisplayed:false,
}

const selfRegiration = (state = initialState, action) => {

    switch (action.type) {

      case constants.UPDATE_FIELD:
        return {
            ...state, RegistrationFields: {
                ...state.RegistrationFields,
            [action.fieldId]: action.value
        }}   
        case constants.FIELD_HAS_ERROR:
            return {
                ...state, valiadationErrors: {
                    ...state.valiadationErrors,
                    [action.fieldId]: action.errorMessageId
                }
            }
        case constants.FIELD_IS_VALID:
            return {
                ...state, valiadationErrors: {
                    ...state.valiadationErrors,
                    [action.fieldId]: null
                }
            }
        case constants.ADD_REGISTRATION:
            return {
                ...state,
                registrationList: [...state.registrationList, action.registrationObject]
                , submitted: action.submitted
            }
        case constants.SHOW_MODAL:
            return {
                ...state,
                isModalDisplayed: action.value
            }
        case constants.HIDE_MODAL:
            return {
                ...state,
                isModalDisplayed: action.value
            }
        case constants.RESET:
            return{
                ...state,
                RegistrationFields: {
                    organizationType: 'government',
                    organizationId: null,
                    crNumber: null,
                    crIssueDate: null,
                    crEndDate: null,
                    residentsId: null,
                    sponsoredNumber: null,

                    userType: 'saudi',
                    idNumber: null,
                    birthDate: null,
                    email: null,
                    mobileNumber: null,

                    location: false,
                    long: null,
                    lat: null,
                    regionEn: null,
                    regionAr: null,
                    cityEn: null,
                    cityAr: null,
                    districtEn: null,
                    districtAr: null,
                    streetEn: null,
                    streetAr: null,
                    postalCode: null,
                    phoneNumber: null,
                    faxNumber: null,

                    termsAndConditions:false,
                    agreementForm: null,
                    cr: null,
                },
                valiadationErrors: {},
                submitted: false,
                isModalDisplayed: false,
            }
        default:
            return state
    }
}

export default selfRegiration