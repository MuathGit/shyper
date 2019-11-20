import { CHANGE_LOCALE, AR } from '../constants/LocaleConstants'

const initialState = {
  currentLocale: AR
}

const locale = (state = initialState, action) => {
  switch (action.type) {
  case CHANGE_LOCALE:
    return {...state, currentLocale: action.locale}
  case 'loction':
    return {...state, loction: action.location}
  default:
    return state
  }
}

export default locale
