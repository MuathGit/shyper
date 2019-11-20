import React from 'react'
import PageContentComponent from '../PageContent/PageContentComponent'
import CheckboxButtonGroupComponent from '../Form/CheckboxButton/CheckboxButtonGroupComponent'
import StaticDataGroupComponent from '../Form/StaticDataGroupComponent';
import StaticDataComponent from '../Form/StaticDataComponent';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom'
import StaticAttchmentComponent from '../Form/StaticAttachmentComponent'

export default class LicenseRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      license:this.props.location.state.licenseRequest
    } 
  }

  handleCheckedBox = (event) => {
    let {license} = this.state
    // let x = deliveryActivties.filter(da => da.id === event.target.id)
    const deliveryActivties = license.deliveryActivties
    for (const activity in license.deliveryActivties) {
      if (deliveryActivties[activity].id === event.target.id ) { 
        deliveryActivties[activity].checked = !deliveryActivties[activity].checked
        this.setState({ deliveryActivties })
      }
    }
  }

  handleInputChange = (fieldId, value) => {
    let { state } = this
    state[fieldId] = value
    this.setState(state)
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

  handleLicenseDuration = (type) =>{
    console.log("TYpe",type);
    if(type === 'OneYear'){
      return <FormattedMessage id='oneYear'/>
    }
  }

  onPrint = () => {
    window.print()
  }

  render() {
    const {license} = this.state
    return (
      <PageContentComponent title={<FormattedMessage id='licenseRequestInfo'/>}>
        <CheckboxButtonGroupComponent
        checkboxItems={this.state.license.deliveryActivties}
        locale='ar'
        onChange={''}
        choiceId={false}
        label={<FormattedMessage id='deliveryActivity'/>}
      />
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='driverType'/>} value={this.handleDriverType()}  colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='sequanceNumber'/>} value={license.squanceNumber}  colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='driverId'/>} value={license.driverId}  colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='vehicalMaker'/>} value={license.vehicalMaker}  colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='plateNumber'/>} value={license.plateNo}  colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='color'/>} value={license.color}  colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='plateType'/>} value={license.plateType}  colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='expiryDate'/>} value={license.expiryDate}  colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='vehicalModel'/>} value={license.vehicalModel}  colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='driverName'/>} value={license.driverName}  colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='modelYear'/>} value={license.modelYear}  colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='deliveryActivityLicenseNo'/>} value={license.LicenseActictityNo}  colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='deliveryActivityLicenseDate'/>} value={license.modelYear}  colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='licenseStartDate'/>} value={license.startDate}  colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='licenseEndDate'/>} value={license.startDate}  colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='licenseDuration'/>} value={this.handleLicenseDuration(license.licenseDuration)}  colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
          <StaticDataComponent label={<FormattedMessage id='attachment'/>} value={
        <StaticAttchmentComponent
          id="atch1"
          colSize={[1, 10]}
          hasLink="#c"
        />
        }  colSize={[2, 4]} />
        </StaticDataGroupComponent>
        <div class="pageActions">
            <Link to={'licenseRequestList'}>
              <button className='btn btn-secondary' type='button'>
                <FormattedMessage id='back' />
              </button>
            </Link>
            <Link to={''}>
              <button className='btn printButton' type='button' onClick={this.onPrint}>
                <FormattedMessage id='print' /> <i className='fa fa-print' />
              </button>
            </Link>
       </div>
      </PageContentComponent>
    )
  }
}
