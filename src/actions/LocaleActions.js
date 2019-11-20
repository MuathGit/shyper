import { CHANGE_LOCALE } from '../constants/LocaleConstants'

export const doChangeLocale = locale => ({
  type: CHANGE_LOCALE,
  locale,
})

export const doChangeNav = nav => ({
  type: 'location',
  location: nav,
})

export const changeLocale = locale => (dispatch) => {
  localStorage.setItem('locale', locale)
  dispatch(doChangeLocale(locale))
}

export const changeNav = nav => (dispatch) => {
  dispatch(doChangeNav(nav))
}
