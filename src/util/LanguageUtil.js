import { addLocaleData } from 'react-intl'
import ar from 'react-intl/locale-data/ar'
import en from 'react-intl/locale-data/en'
import { AR, EN } from '../constants/LocaleConstants'
import { changeLocale } from '../actions/LocaleActions'

export const initLocale = (store) => {
  addLocaleData([...en, ...ar])
  const locale = localStorage.getItem('locale')
  if (locale === AR || locale === EN) {
    store.dispatch(changeLocale(locale))
  }
}
