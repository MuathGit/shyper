import React from 'react'
import { connect } from 'react-redux'
import { AR } from '../../constants/LocaleConstants'
import HeaderContainer from '../../containers/HeaderContainer'
import NavMenuComponent from '../NavMenu/NavMenuComponent'
import FooterComponent from '../Footer/FooterComponent'
import './Home.css'

class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: props.locale,
    }
  }

  render() {
    const props = this.props
    const { locale } = this.props
    const dir = AR === locale.currentLocale ? 'rtl' : 'ltr'
    // const { user, users } = this.props;
    return (
      <div dir={dir} className='page-wrapper'>
        <HeaderContainer />
        <NavMenuComponent locale={props.locale.currentLocale} />
        <FooterComponent />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state
  const { user } = authentication
  const { locale } = state.locale
  return {
    user,
    users,
    locale,
  }
}

const connectedHomePage = connect(mapStateToProps)(HomeComponent)
export { connectedHomePage as HomeComponent }