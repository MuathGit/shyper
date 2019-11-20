import { connect } from 'react-redux'
import { changeLocale, changeNav } from '../actions/LocaleActions'
// import { logout } from '../actions/UserActions'
import LayoutComponent from '../components/LayoutComponent/LayoutComponent'

const mapStateToProps = state => ({
  locale: state.locale.currentLocale,
  //    user: state.user.currentUser,
  location: state.location,
})

const mapDispatchToProps = dispatch => ({
  onLocaleClick: (locale) => {
    dispatch(changeLocale(locale))
  },

  onNavClick: (url) => {
    dispatch(changeNav(url))
  },
})

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LayoutComponent)

export default LayoutContainer
