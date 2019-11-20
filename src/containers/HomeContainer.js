import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeLocale } from '../actions/localeactions'
//import { doFetchNotifications, doHideNotification } from '../actions/NotificationsActions'
//import {updateCurrentBranch} from '../actions/UserActions'
import HomeComponent from '../components/Home/HomeComponent'
import NavMenuComponent from '../components/NavMenu/NavMenuComponent';
import FooterComponent from '../components/Footer/FooterComponent';
//import { intl } from './IntlContainer'

const mapStateToProps = (state) => {
  return {
    locale: state.locale.currentLocale
    //,
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
  
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent,NavMenuComponent,FooterComponent)

export default HomeContainer
