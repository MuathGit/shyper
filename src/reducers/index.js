import { combineReducers } from 'redux'
import locale from './LocaleReducer'
import selfRegiration from './RegistrationReducer'
import licenseRequestManagement from "./LicenseRequestManagementReducer";
import registrationList from './RegistrationListReducer'
import errorMessage from './ErrorReducer'

export default combineReducers({
    locale,
    selfRegiration,
    licenseRequestManagement,
    registrationList,
    errorMessage,
})