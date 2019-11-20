import axios from 'axios'
import constants from '../constants/otpConstants'
import {ValidationRunner} from '../validators/ValidationRunner'
import * as formValidators from '../validators/OtpValidators'

const ENDPOINTS = {
  ACTIVATE: '/api/v1/users/Activation/check',
  VALIDATION: '/api/v1/users/Activation/validate',
  SEND:'/api/v1/users/Activation/send',
  SETPASSWORD:'/api/v1/users/Activation/setPassword',
}

export const addOtpValidationError = (errorId) => {
  return {
    type: constants.VALIDATION_ERROR,
    errorId
  }
}
export const updateOTPField = (fieldId, value) => {
  return {
    type: constants.UPDATE_OTP_FIELD,
    fieldId,
    value
  }
}

export const addOtp = (data) => {
  return {
    type: constants.ADD_OTP,
    subMsg:data.msg,
    msgType:data.msgType,
    switchModal:data.switchModal,
    isOTPValid: true,
    isModalVisible: false,
    mobile:data.mobile,
    isSecondModalVisible:data.switchModal,
    starCount:data.starCount

  }
}

export const ValidLink = (data) => {
  return {
    type: constants.VALID_LINK,
    msg:data.msg,
    msgType:data.msgType,
    switchButton:false,
    disableConfirmBtn:false,
    mobile:data.mobile,
    nameAr:data.nameAr,
    nameEn:data.nameEn,
  }
}

export const inValidOtp = (data) => {
  return {
    type: constants.SHOW_ERROR,
    arabicErrorMsg:data.arabicMessage,
    englishErrorMsg:data.message,
    showError:true,
    isModalVisible: false,
  }
}
export const inValidLink = (data) => {
  return {
    type: constants.INVALID_LINK,
    msg:data.msg,
    msgType:data.msgType,
    switchButton:false,
    disableConfirmBtn:true,
  }
}

export const setPasswordResponse = (data) => {
  return {
    type: constants.PASSWORD_SET,
    subMsg:'default2',
    msg:data.msg,
    msgType:data.msgType,
    switchButton:data.switchButton,
    nameAr:data.nameAr,
    nameEn:data.nameEn,
    username:data.username,
    isModalVisible: false,
    isSecondModalVisible: false,
    showError:false,
  }
}
export const sendPassword = (data) => {
  return {
    type: constants.SEND_OTP,
    isOTPValid: false,
    isModalVisible: true,
    doDisable: true,
    doIFreez:data.freez,
    mobile:data.mobile,
    starCount:data.starCount,
    arabicErrorMsg:null,
    englishErrorMsg:null,
    showError:false,
  }
}
export const showModal = () => {
  return {
    type: constants.SHOW_MODAL,
    isModalVisible: true,
    arabicErrorMsg:null,
    englishErrorMsg:null,
    showError:false,

  }
}
export const hideModal = () => {
  return {
    type: constants.HIDE_MODAL,
    isModalVisible: false,

  }
}
export const showSecondModal = () => {
  return {
    type: constants.SHOW_SECOND_MODAL,isSecondModalVisible: true

  }
}
export const hideSecondModal = () => {
  return {
    type: constants.HIDE_SECOND_MODAL,isSecondModalVisible: false

  }
}
export const disable = (Dflag) => {
  return {
    type: constants.DISABLE_BUTTON,doDisable: Dflag,

  }
}

export const validateLink = (ref) => {
  return (dispatch) => {
    const token= ref
    axios.post(ENDPOINTS.ACTIVATE,{ref:token
    }).then((response) => {
      if(response.data.msgType=== 'success'){
        dispatch(ValidLink(response.data))
      }else{
        dispatch(inValidLink(response.data))}

    }).catch((error) => {
      dispatch(inValidLink(error.response.data))
    })
  }
}

export const validateOtp = () => {
  return (dispatch, getState) => {
    const state = getState().oneTimePassword
    const {fields, valiadationErrors} = state
    const otpassword=state.fields.password
    if(checkFieldsForValidity(dispatch, fields, valiadationErrors,
      formValidators.inputValidator, addValidationError, removeValidationError)) {

      axios.post(ENDPOINTS.VALIDATION, {
        password:otpassword,mobile:state.mobile
      }).then((response) => {
        dispatch(addOtp(response.data))
      }).catch((error) => {
        dispatch(addOtpValidationError(error))
      })
    }
  }
}

export const sendOtp = () => {
  return (dispatch, getState) => {
    const state = getState().oneTimePassword
    const language = getState().locale.currentLocale
    axios.post(ENDPOINTS.SEND, {
      mobile:state.mobile,funcType:'SEND',language
    }).then((response) => {
      dispatch(sendPassword(response.data))
    }).catch((error) => {
      dispatch(inValidOtp(error.response.data))
    })
  }
}

export const reSendOtp = () => {
  return (dispatch, getState) => {
    const state = getState().oneTimePassword
    const language = getState().locale.currentLocale
    axios.post(ENDPOINTS.SEND, {
      mobile:state.mobile,funcType:'RESEND',language
    }).then((response) => {
      dispatch(sendPassword(response.data))
    }).catch((error) => {
      dispatch(inValidOtp(error.response.data))
    })
  }
}

export const setPassword = (ref) => {
  return (dispatch, getState) => {
    const token= ref
    const state = getState().oneTimePassword
    const pass=state.fields.accountPassword
    axios.post(ENDPOINTS.SETPASSWORD, {
      password:pass,ref:token
    }).then((response) => {
      dispatch(setPasswordResponse(response.data))
    }).catch((error) => {
      dispatch(addOtpValidationError(error))
    })
  }
}
export const addValidationError = (fieldId, errorMessageId) => {
  return {
    type: constants.FIELD_HAS_ERROR,
    fieldId,
    errorMessageId
  }
}

export const removeValidationError = (fieldId) => {
  return {
    type: constants.FIELD_IS_VALID,
    fieldId
  }
}

function checkFieldsForValidity(dispatch, fields, valiadationErrors, validators, onError, doIfValid) {

  const fieldErrors = ValidationRunner(fields, validators)
  var allValid = true
  for(let field in fieldErrors) {
    if(fieldErrors[field].length > 0) {
      dispatch(onError(field, fieldErrors[field][0]))
      allValid = false
    } else if(valiadationErrors[field] !== null){
      dispatch(doIfValid(field))
    }
  }
  return allValid
}
