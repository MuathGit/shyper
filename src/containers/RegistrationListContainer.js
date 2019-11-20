import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actions from '../actions/RegirationListActions'
import PageContentComponent from '../components/PageContent/PageContentComponent'
import RegistirationListComponent from '../components/Registration/RegistirationListComponent'
import SearchRegistirationComponent from '../components/Registration/SearchRegistirationComponent'
// import HeaderComponent from '../components/Header/HeaderComponent'

class RegistrationListContainer extends Component {

  componentDidMount() {
    const { currentPage, currentSortCol, currentSortDir, registrations } = this.props
    if(registrations && registrations.length === 0) {
      this.props.loadRegistrations(currentPage, 10, currentSortCol, currentSortDir,true)
    }
  }

  render() {
    const pageTitle = this.props.locale === 'ar' ? 'قائمة التسجيل' : 'Registiration List'
    return (
      <PageContentComponent routes={this.props.routes} title={pageTitle}>
        <SearchRegistirationComponent isBasicSearch={this.props.isBasicSearch}
                              searchFields={this.props.searchFields}
                              onToggleSearchType={this.props.onToggleSearchType}
                              updateSearchFields={this.props.updateSearchFields}
                              userRoleLevel={this.props.userRoleLevel}
                              locale={this.props.locale}
                              onSearch={() => this.props.loadRegistrations(
                                0,
                                10,
                                this.props.currentSortCol,
                                this.props.currentSortDir,
                                false
                              )}/>
        <br/>
        <RegistirationListComponent registrations={this.props.registrations}
                            totalRecords={this.props.totalRecords}
                            isLoading={this.props.isLoading}
                            onTableChange={this.props.loadShipments}
                            currentPage={this.props.currentPage}
                            currentSortCol={this.props.currentSortCol}
                            currentSortDir={this.props.currentSortDir}
                            setActiveUser={this.props.setActiveUser}
                            errorMessage={this.props.errorMessage}
                            resetErrorMessage={this.props.resetErrorMessage}
                            locale={this.props.locale}
                            onExport={this.props.onExport}
                            userRoleLevel={this.props.userRoleLevel}
                            isModalVisible={this.props.isModalVisible}
                            dismissModal={this.props.dismissModal}
                            showModal={this.props.showModal}
                            setActiveRequest={this.props.setActiveRequest}
                            showSuccessMessage={this.props.showSuccessMessage}
                            resetSuccessMessage={this.props.resetSuccessMessage}/>
      </PageContentComponent>
    )
  }
}

RegistrationListContainer.propTypes = {
  routes: PropTypes.array,
  registrations: PropTypes.array.isRequired,
  totalRecords: PropTypes.number.isRequired,
  loadRegistrations: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isBasicSearch: PropTypes.bool.isRequired,
  searchFields: PropTypes.object.isRequired,
  onToggleSearchType: PropTypes.func.isRequired,
  updateSearchFields: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  currentSortCol: PropTypes.string,
  currentSortDir: PropTypes.string,
  setActiveUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  onExport: PropTypes.func.isRequired,
  userRoleLevel: PropTypes.arrayOf(PropTypes.string).isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  dismissModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  onDeleteBranch: PropTypes.func.isRequired,
  showSuccessMessage: PropTypes.bool.isRequired,
  resetSuccessMessage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    registrations: state.registrationList.registrations,
    isModalVisible: state.registrationList.isModalVisible,
    showSuccessMessage: state.registrationList.showSuccessMessage,
    isBasicSearch: state.registrationList.isBasicSearch,
    totalRecords: state.registrationList.totalRecords,
    isLoading: state.registrationList.isLoading,
    searchFields: state.registrationList.searchFields,
    currentPage: state.registrationList.pageProps.page,
    currentSortCol: state.registrationList.pageProps.sortCol,
    currentSortDir: state.registrationList.pageProps.sortDir,
    errorMessage: state.errorMessage.error,
    locale: state.locale.currentLocale,
    fields: state.selfRegiration.RegistrationFields,
    valiadationErrors: state.selfRegiration.valiadationErrors,
    registrationList: state.selfRegiration.registrationList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadRegistrations: (page, limit, sortCol, sortDir, firstLoad) => {
      dispatch(actions.doFetchRegistrationIfNeeded(page, limit, sortCol, sortDir, firstLoad))
    },
    onToggleSearchType: () => dispatch(actions.doToggleSearchType()),
    updateSearchFields: (fields) => {
      dispatch(actions.doUpdateSearchFields(fields))
    },
    setActiveUser: (id) => dispatch(actions.doSetActiveUser(id)),
    onExport: (type) => dispatch(actions.doExport(type)),
    dismissModal: () => dispatch(actions.doDismissModal()),
    showModal: () => dispatch(actions.doShowModal()),
    resetSuccessMessage: () => dispatch(actions.doResetSuccessMessage()),
    setActiveRequest: (id) => dispatch(actions.doSetActiveRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationListContainer)
