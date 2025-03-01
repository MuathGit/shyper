import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl';
import { AR } from '../../constants/LocaleConstants'
import HeaderContainer from '../../containers/HeaderContainer'
import NavMenuComponent from '../NavMenu/NavMenuComponent'
import FooterComponent from '../Footer/FooterComponent'
import './Layout.css'
import '../../assets/css/custom-ar.css'
import LoginComponent from '../Login/loginComponent'
import logoImg from '../../assets/images/shypr-logo-cut.png'
import marker from '../../assets/images/header-bg-old.png'

export default class LayoutComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: props.locale,
      isLoggedIn: false,
      selfRegiration: false,
    }
  }

login = () => { this.setState({ isLoggedIn: true }) }

toSelfRegistration = () => { this.setState({ selfRegiration: true }) }

render() {
  const { locale, children, history } = this.props
  const { isLoggedIn, selfRegiration } = this.state
  const dir = AR === locale ? 'rtl' : 'ltr'

  return (
    <div dir={dir} className={!isLoggedIn || !selfRegiration ? '' : 'page-wrapper '}>
      {(!isLoggedIn && selfRegiration) || !isLoggedIn ? null : <HeaderContainer />}
      <section>
        <div className={isLoggedIn || selfRegiration ? 'container' : 'login'}>
          <div className={isLoggedIn || selfRegiration ? 'row page-layout' : 'login-container'}>
            { isLoggedIn ? <NavMenuComponent location={history.location.pathname} />
              : selfRegiration
                ? (
                  <div className="logo">
                    <img src={logoImg} alt="بوابة نقل " width="500" />
                  </div>
                )
                : (
                  <Fragment>
                    <div className="logo">
                      <img src={logoImg} alt="بوابة نقل " width="500" />
                    </div>
                    <LoginComponent
                      login={this.login}
                      toSelfRegistration={this.toSelfRegistration}
                    />
                  </Fragment>
                )}
            <div className={isLoggedIn && history.location.pathname === '/' ? 'welcome' : 'hide'} id='landingPageWelcome'>
              {/* <img className='headerMarker' alt='headermarker' src={marker} /> */}
              <h1 className='welcomeLarg'><FormattedMessage id='welcome' /></h1>
              <h1 className='welcomeSmall'><FormattedMessage id='welcomeSmall' /></h1>
              <p>
                <FormattedMessage id='purpose' />
              </p>
            </div>
            {children}
          </div>
        </div>
      </section>
      <FooterComponent />
    </div>
  )
}
}

LayoutComponent.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.node,
  routes: PropTypes.array,
  onNavClick: PropTypes.func,
  location: PropTypes.string,
}
