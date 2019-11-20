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
    this.props.loadRegistrations(currentPage, 10, currentSortCol, currentSortDir, true)
  }

  render() {
    const pageTitle = 'طلبات التسجيل'
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
          )}
        />
        <br />
        <RegistirationListComponent
          registrations={this.props.registrations}
          totalRecords={this.props.totalRecords}
          isLoading={this.props.isLoading}
          onTableChange={this.props.loadShipments}
          currentPage={this.props.currentPage}
          currentSortCol={this.props.currentSortCol}
          currentSortDir={this.props.currentSortDir}
          setActiveUser={this.props.setActiveUser}
          locale={this.props.locale}
          onExport={this.props.onExport}
          userRoleLevel={this.props.userRoleLevel}
        />
      </PageContentComponent>
    )
  }
}

RegistrationListContainer.propTypes = {
  routes: PropTypes.array,
  registrations: PropTypes.array,
  totalRecords: PropTypes.number,
  loadRegistrations: PropTypes.func,
  isLoading: PropTypes.bool,
  isBasicSearch: PropTypes.bool,
  searchFields: PropTypes.object,
  onToggleSearchType: PropTypes.func,
  updateSearchFields: PropTypes.func,
  currentPage: PropTypes.number,
  currentSortCol: PropTypes.string,
  currentSortDir: PropTypes.string,
  setActiveUser: PropTypes.func,
  locale: PropTypes.string,
  onExport: PropTypes.func,
  userRoleLevel: PropTypes.arrayOf(PropTypes.string),
}

const mapStateToProps = (state) => {
  return {
    registrations: state.registrationList.registrations,
    isBasicSearch: state.registrationList.isBasicSearch,
    totalRecords: state.registrationList.totalRecords,
    isLoading: state.registrationList.isLoading,
    searchFields: state.registrationList.searchFields,
    currentPage: state.registrationList.pageProps.page,
    currentSortCol: state.registrationList.pageProps.sortCol,
    currentSortDir: state.registrationList.pageProps.sortDir,
    locale: state.locale.currentLocale,
    fields: state.selfRegiration.RegistrationFields,
    valiadationErrors: state.selfRegiration.valiadationErrors,
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
    setActiveUser: (id) => { dispatch(actions.doSetActiveUser(id)) },
    onExport: (type) => { dispatch(actions.doExport(type)) },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationListContainer)
