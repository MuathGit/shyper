import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import { initLocale } from './util/LanguageUtil'
import IntlContainer from './containers/IntlContainer'
import LayoutContainer from './containers/LayoutContainer'
import reducers from './reducers'
import './assets/css/font-awesome.min.css'
import './assets/css/bootstrap-ar.min.css'
import './assets/css/bootstrap-grid-rtl.css'
import './assets/css/custom-ar.css'
import './landingPage.css'
import ListOfLicenseRequestContainer from './containers/ListOfLicenseRequestContainer'
import RegistrationContainer from './containers/RegistrationContainer'
import RequestDeliveryLicenseContainer from './containers/RequestDeliveryLicenseContainer'
import ViewRegistration from './components/Registration/ViewRegistrationComponent'
import ViewLicenseRequest from './components/LicenseRequest/ViewLicenseRequesComponent'
import RegistrationListContainer from './containers/RegistrationListContainer'
import ShipmentDestinationComponents from './components/Shimpments/ShippingDetailsComponents/ShipmentDestinationComponents';
import ShipmentOriginComponents from './components/Shimpments/ShippingDetailsComponents/ShipmentOriginComponents';
import ShipmentDetailsComponents from './components/Shimpments/ShipmentDetailsComponents/ShipmentDetailsComponents';
import ShipmentRatesComponents from './components/Shimpments/order/ShippingRatesComponent'
import ParcelDetailsComponent from './components/Shimpments/order/ParcelDetailsComponent'

const store = createStore(reducers, applyMiddleware(thunk))
initLocale(store)

const Both = props => (
  <LayoutContainer {...props}>
    <Switch>
      <Route exact path='/' />
      <Route path='/self-Registration' component={RegistrationContainer} />
      {/* <Route path='/requestLicense' component={RequestDeliveryLicenseContainer} /> */}
      <Route path='/registration-list' component={RegistrationListContainer} />
      <Route path='/ViewRegistration' component={ViewRegistration} />
      {/* <Route path='/licenseRequestList' component={ListOfLicenseRequestContainer} />
      <Route path='/ViewLicenseRequest' component={ViewLicenseRequest} /> */}

      <Route path="/from-destination" exact component={ShipmentOriginComponents} />
      <Route path="/to-destination" exact component={ShipmentDestinationComponents} />
      <Route path="/shipment-details" exact component={ShipmentDetailsComponents} />
      <Route path="/shipment-rates" exact component={ShipmentRatesComponents} />
    </Switch>
  </LayoutContainer>
)

render(
  <Provider store={store}>
    <IntlContainer>
      <Router>
        <div>
          <Route path='/' component={Both} />
        </div>
      </Router>
    </IntlContainer>
  </Provider>, document.getElementById('root'),
)
registerServiceWorker()
