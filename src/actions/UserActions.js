import {
    CLEA_ERROR_MSGS,
    CLEAN_SUCCESS_MSGS,
    ON_ERROR,
    ON_SUCCESS,
    SHOW_MODAL,
    HIDE_MODAL,
    CAN_NOT_FETCH_USER,
    UPDATE_PROFILE_FIELD,
    USER_LOGIN,
    USER_LOGOUT,
    UPDATE_CURRENT_BRANCH
} from '../constants/UserConstants'
import axios from 'axios'

const ENDPOINTS = {
  FETCH_USER: '/api/v1/users/me',
  CHANGE_PASSWORD: '/api/v1/users/changePassword',
}

export const login = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
  return {
    type: USER_LOGIN,
    user: user
  }
}

export const logout = (user) => {
  user.isAuthenticated = false
  return {
    type: USER_LOGOUT,
    user: user
  }
}

export const returnError = () =>{
  return{
    type:CAN_NOT_FETCH_USER,
    MsgCode:'serverError',
    MsgStatus:'error'
  }
}

export const updateProfileField = (fieldId, value) => {
  return {
    type: UPDATE_PROFILE_FIELD,
    fieldId,
    value
  }
}
export const returnUserData = (user) => {
  return {
    type: USER_LOGIN,
    user: user
  }
}

export const FetchProfileData = () => {
  return (dispatch, getState) => {
    let storage = getState().user.currentUser
    axios.get(ENDPOINTS.FETCH_USER)
      .then((response) => {
        storage = response.data
        storage.isAuthenticated = true
        dispatch(returnUserData(storage))
      }).catch((error) => {
      console.log(error)
    })
  }
}

export const onSuccess = () => {
  return {
    type: ON_SUCCESS,
    successmsg:'MSG084',
    showPassModal: false,

  }
}
export const onError = (error) => {
  return {
    type: ON_ERROR,
    errorMsg:error.message,
    arabicErrorMsg:error.arabicMessage,
    showPassModal: true,

  }
}
export const emptySuccess = () => {
  return {
    type: CLEAN_SUCCESS_MSGS,
    successmsg:null,

  }
}
export const emptyErrors = () => {
  return {
    type: CLEA_ERROR_MSGS,
    errorMsg:null,
    arabicErrorMsg:null,

  }
}
export const changeUserPassword = ()=>{
  return (dispatch,getState)=>{
    let {fields}=getState().userProfile
    axios.patch(ENDPOINTS.CHANGE_PASSWORD,{
      password:fields.accountPassword,
      oldPassword:fields.oldPassword
    })
    .then((response) => {
      dispatch(onSuccess(response))
    }).catch((error) => {
      dispatch(onError(error.response.data))
    })
  }
}

export const showModal = () => {
  return {
    type: SHOW_MODAL,showPassModal: true

  }
}
export const hideModal = () => {
  return {
    type: HIDE_MODAL,showPassModal: false

  }
}
