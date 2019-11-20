import { connect } from 'react-redux'
import LicenseRequest from '../components/LicenseRequest/LicenseRequest'

const mapStateToProps = state => ({
  locale: state.locale.currentLocale,
})

const RequestDeliveryLicenseContainer = connect(mapStateToProps)(LicenseRequest)

export default RequestDeliveryLicenseContainer
