import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
//ToDo dynamic loading of messages
import ar from '../intl/ar'
import en from '../intl/en'

function mapStateToProps(state) {
  const { currentLocale } = state.locale
  if (currentLocale === 'ar') {
    return { locale: currentLocale, messages: ar.messages }
  }
  return { locale: currentLocale, messages: en.messages }
}
export default connect(mapStateToProps)(IntlProvider)
