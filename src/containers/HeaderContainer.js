import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeLocale } from '../actions/LocaleActions'
// import { doFetchNotifications, doHideNotification } from '../actions/NotificationsActions'
import HeaderComponent from '../components/Header/HeaderComponent'

const mapStateToProps = (state) => {
  return {
    locale: state.locale.currentLocale,
    // notifications: state.notifications.notifications,
    // user : state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLocaleClick: (locale) => {
      dispatch(changeLocale(locale))
    }
  }
  return bindActionCreators(
    {
      changeLocale,
      // doFetchNotifications,
      // doHideNotification
    },
    dispatch)
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent)

export default HeaderContainer
