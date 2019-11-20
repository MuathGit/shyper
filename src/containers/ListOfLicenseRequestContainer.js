
import { connect } from 'react-redux'
import * as actions from '../actions/LicenseRequestManagementActions'
import ListOfLicenseRequestComponent from '../components/LicenseRequest/ListOfLicenseRequestComponent'


const mapStateToProps = (state) => {
  return {
    locale: state.locale.currentLocale,
    licensesList: state.licenseRequestManagement.licenses,
    isLoading: state.licenseRequestManagement.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadLicenseRequest: () => {
      dispatch(actions.doFetchLicenseRequestIfNeeded())
    },
    setActiveRequest: (id) => dispatch(actions.doSetActiveRequest(id)),
    increment:() =>dispatch(actions.doIncrement())
    

  }
}

const ListOfLicenseRequestContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfLicenseRequestComponent)

export default ListOfLicenseRequestContainer

