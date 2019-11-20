import constants from '../constants/RegistrationConstants'
import { ValidationRunner } from '../validators/ValidationRunner'
import * as formValidators from '../validators/RegistrationValidator'



export const updateField = (fieldId, value) => {
  return {
    type: constants.UPDATE_FIELD,
    fieldId,
    value
  }
}

export const resetFields = () => {
  return {
    type: constants.RESET,
  }
}

export const showModal = () => {
  return {
    type: constants.SHOW_MODAL,
    value: true
  }
}

export const hideModal = () => {
  return {
    type: constants.HIDE_MODAL,
    value:false
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
export const addRegistration = (registrationObject) => {
  return {
    type: constants.ADD_REGISTRATION,
    registrationObject,
    submitted:true
  }
  }


export const submit = () => {
  return (dispatch, getState) => {
    const obj = getState().selfRegiration.RegistrationFields
    const errors = getState().selfRegiration.valiadationErrors
    
    // if (checkFieldsForValidity(dispatch, obj, errors,
    //   obj.organizationType ==='government' ? formValidators.slefRegValidators : formValidators.nonGovTypeValidators, addValidationError, removeValidationError)) {
    //   dispatch(addRegistration(obj))
    // }
    dispatch(addRegistration(obj))
    
  }
}
function checkFieldsForValidity(dispatch, fields, valiadationErrors, validators, onError, doIfValid) {

  const fieldErrors = ValidationRunner(fields, validators)
  var allValid = true
  for (let field in fieldErrors) {
    if (fieldErrors[field].length > 0) {
      dispatch(onError(field, fieldErrors[field][0]))
      allValid = false
    } else if (valiadationErrors[field] !== null) {
      dispatch(doIfValid(field))
    }
  }
  return allValid
}