import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/RegirationActions'
import SelfRegistrationComponent from '../components/Registration/SelfRegistrationComponent'
//import HeaderComponent from '../components/Header/HeaderComponent'

const mapStateToProps = (state) => {
  return {
    locale: state.locale.currentLocale,
    fields: state.selfRegiration.RegistrationFields,
    submitted: state.selfRegiration.submitted,
    isModalDisplayed: state.selfRegiration.isModalDisplayed,
    valiadationErrors: state.selfRegiration.valiadationErrors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldUpdate: (fieldId, value) => {
      dispatch(actions.updateField(fieldId, value))
    },
    handleSubmit: (fieldId, value) => {
      dispatch(actions.submit())
    },
    showModal: () => {
      
      dispatch(actions.showModal())
    },
    hideModal: () => {
      dispatch(actions.hideModal())
    },
    resetFields: () => {
      dispatch(actions.resetFields())
    },
  }
}

const RegistrationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelfRegistrationComponent)

export default RegistrationContainer
