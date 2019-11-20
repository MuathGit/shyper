import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { withRouter, Link } from 'react-router-dom'
import DatatableComponent from '../Datatable/DatatableComponent'
import Column from '../Datatable/Column'
import ActionButtonComponent from '../Form/ActionButtonComponent'
import SubTitle from '../Subtitle/SubtitleComponent'
// import ErrorMessageCompnent from '../ErrorMessageComponent'
import FormGroupComponent from '../Form/FromGroupComponent'
import FormControlComponent from '../Form/FormControlComponent'
import '../Form/Button.css'
import { AR } from '../../constants/LocaleConstants'
import PageContentComponent from '../PageContent/PageContentComponent'

class ListOfLicenseRequestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
        counter:1,
        searchClicked:false,
        generalSearch:null,
    }
    this.handleTableChange = this.handleTableChange.bind(this)
    this.handleActionsCellRender = this.handleActionsCellRender.bind(this)
    this.onViewLicense = this.onViewLicense.bind(this)
    this.onModalDismiss = this.onModalDismiss.bind(this)
    this.hideConfirmMessage = this.hideConfirmMessage.bind(this)
    this.handleCorporateNameCellRender = this.handleCorporateNameCellRender.bind(this)
    this.handleOwnerNameCellRender = this.handleOwnerNameCellRender.bind(this)
  }

  componentDidMount(){
      if(!this.state.searchClicked){
      this.props.loadLicenseRequest()
      }
  }
  handleTableChange(page, size, sortCol, sortDir) {
    this.props.onTableChange(page, size, sortCol, sortDir)
  }

  onViewLicense(id) {
    if (this.props.isLoading === false) {
            this.props.setActiveRequest(id)
      const list = this.props.licensesList
      const request = list.filter(i => i.id === id)      
            this.props.history.push({
              pathname: '/ViewLicenseRequest',
              state: { licenseRequest: request[0] }
            })
            //this.props.history.push('/ViewLicenseRequest')
    }
  }

  handleActionsCellRender(data) {
    const divStyle = { whiteSpace: 'nowrap', textAlign: 'center', cursor: 'pointer' }
    const { locale } = this.props
    const Edit = locale !== AR ? 'Edit' : '\u062a\u0639\u062f\u064a\u0644'
    const View = locale !== AR ? 'View' : '\u0639\u0631\u0636'    
    return (
      <div style={divStyle}>
        <span>
          <ActionButtonComponent id={'DT-ViewPermit' + data.id} type='View' hint={View} onClick={() => this.onViewLicense(data.id)} /> 
        </span>
      </div>
    )
  }

  handleStatusCellRender(data) {
    const stat = this.props.listOfStatuses.filter(status => status.id.itemId === data.requestStatus)
    return this.props.locale === AR ? stat[0].itemNameAr : stat[0].itemNameEn
  }

  onModalDismiss() {
    this.setState({ ...this.state, userToDelete: null })
    this.props.dismissModal()
  }

  hideConfirmMessage() {
    this.props.resetSuccessMessage()
  }

  handleCorporateNameCellRender(data) {
    if (this.props.locale === AR) {
      return data.corporate.corporateNameAr
    }
    return data.corporate.corporateNameEn
  }

  handleOwnerNameCellRender(data) {
    if (this.props.locale === AR) {
      return data.fullNameAr
    }
    return data.fullNameEn
  }

  onSearch = () =>{
    let counter = this.state
    this.props.increment()
    this.props.loadLicenseRequest()
  }

  handleDriverType = (type) =>{
    if(type === 'Owner'){
      return <FormattedMessage id='owner'/>
    }else if(type === 'Co-owner'){
      return <FormattedMessage id='coOwner'/>
    }else{
      return <FormattedMessage id='authDriver'/>
    }
  }
  renderBasicSearch = () => {
    return (
      <div>
        <FormGroupComponent>
          <FormControlComponent
            label={<FormattedMessage id='searchFor' />}
            fieldId='generalSearch'
            value={this.state.generalSearch}
            required='false'
            //errorMessage={this.getError('search')}
            //helpMessage={<FormattedMessage id='searchPermitRequestHint' />}
            //onChange={this.onBasicSearchValueChange}
            //onEnterKeyPress={this.onEnter}
            colSize={[2, 10]}
          >
            <input type='text' maxLength='100' />
          </FormControlComponent>
        </FormGroupComponent>
      </div>
    )
  }

  render() {
    const {
      licensesList,isLoading} = this.props
    const { currentRoles, allowedRoles } = this.state
    const title = 'طلبات التصاريح'
    return (
      <PageContentComponent title={title}>
        {/* <SubTitle title={title}>
        <button className='greenButton' type='button' onClick={this.onSearch}>
                <FormattedMessage id='search' />
        </button>
        </SubTitle> */}
        {/* <ErrorMessageCompnent error={errorMessage ? errorMessage : this.state.isError? <FormattedMessage id='lockedByAnotherUser' />: null} resetErrorMessage={resetErrorMessage} /> */}

        {this.renderBasicSearch()}
        {/* <SubTitle title={<FormattedMessage id='licenseRequestList'/>}/> */}
        <DatatableComponent
          data={licensesList}
          remote
          loading={isLoading}
          pageSize={10}
          total={'0'}
          onChange={this.handleTableChange}
          currentPage={'0'}
          currentSortCol={'requestNumber'}
          currentSortDir={'DESC'}
          indexable={false}
        >

          <Column id='requestNumber' isKey isNumeric>
            <FormattedMessage id='requestNumber' />
          </Column>
          <Column id='driverType' onCellRender={this.handleDriverType}>
            <FormattedMessage id='driverType' />
          </Column>
          <Column id='driverName'>
            <FormattedMessage id='driverName' />
          </Column>
          <Column id='vehicalModel'>
            <FormattedMessage id='vehicalModel' />
          </Column>
          <Column id='createdAt'>
            <FormattedMessage id='requestedDate' />
          </Column>
          <Column onCellRender={this.handleActionsCellRender} headerAlign='center'>
            <FormattedMessage id='actions' />
          </Column>
        </DatatableComponent>
      </PageContentComponent>
    )
  }
}

ListOfLicenseRequestComponent.propTypes = {
  licensesList: PropTypes.array.isRequired,
//   totalRecords: PropTypes.number.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   onTableChange: PropTypes.func.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   currentSortCol: PropTypes.string,
//   currentSortDir: PropTypes.string,
//   setActiveRequest: PropTypes.func.isRequired,
//   setPageMode: PropTypes.func.isRequired,
//   errorMessage: PropTypes.string,
//   resetErrorMessage: PropTypes.func.isRequired,
//   showSuccessMessage: PropTypes.bool.isRequired,
//   resetSuccessMessage: PropTypes.func.isRequired,
//   isModalVisible: PropTypes.bool.isRequired,
//   dismissModal: PropTypes.func.isRequired,
//   showModal: PropTypes.func.isRequired,
//   locale: PropTypes.string.isRequired,
//   listOfStatuses: PropTypes.array,
}

export default withRouter(ListOfLicenseRequestComponent)
