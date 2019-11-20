import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PageContentComponent from '../PageContent/PageContentComponent'
import CheckboxButtonGroupComponent from '../Form/CheckboxButton/CheckboxButtonGroupComponent'
import RadioButtonGroupComponent from '../Form/RadioButton/RadioButtonGroupComponent'
import FormGroupComponent from '../Form/FromGroupComponent'
import FormControlComponent from '../Form/FormControlComponent'
import StaticDataGroupComponent from '../Form/StaticDataGroupComponent'
import StaticDataComponent from '../Form/StaticDataComponent'
import SubtitleComponent from '../Subtitle/SubtitleComponent'

export default class LicenseRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deliveryActivties: [
        {
          id: '0', nameAr: 'توصيل خفيف (أقل من 30 كيلو جرام)', nameEn: 'Light Delivery (Less Than 30KG)', checked: false, show: true,
        },
        {
          id: '1', nameAr: 'توصيل ثقيل (أكثر من 30 كيلو جرام)', nameEn: 'Heavy Delivery (More Than 30KG)', checked: false, show: true,
        },
        {
          id: '2', nameAr: 'توصيل طعام', nameEn: 'Food Delivery', checked: false, show: true,
        },
      ],
      selectedDriverType: 'owner',
      snvr: null,
      mockCarCheckObj: {
        vMaker: 'BMW',
        plateNo: '1010 O L A',
        plateType: 'Private',
        color: 'Grey',
        expiryDate: '13-11-1439',
        vModel: '5 Series',
        coOwner: 'Abdulaziz Alfulaij',
        modelYear: '2018',
        LicenseActictityNo: '1020301050K',
        startDate: '17-10-1439',
        endDate: '17-10-1440',
        owner: 'Yasser Barnawi',
        AuthDriver: 'Moe Alsabih',
      },
    }
  }

  handleCheckedBox = (event) => {
    const { deliveryActivties } = this.state
    // let x = deliveryActivties.filter(da => da.id === event.target.id)
    for (const activity in deliveryActivties) {
      if (deliveryActivties[activity].id === event.target.id) {
        deliveryActivties[activity].checked = !deliveryActivties[activity].checked
        this.setState({ deliveryActivties })
      }
    }
  }

  handleRadioButtonChange = (event) => {
    const { driverTypes } = this.state
    if (event.target.id === 'AuthDriver' || event.target.value === 'coOwner' || event.target.value === 'owner') {
      for (const activity in driverTypes) {
        if (driverTypes[activity].id === event.target.id) {
          driverTypes[activity].checked = true
        }
      }
      this.setState({ selectedDriverType: event.target.value, driverTypes })
    }
  }

  handleInputChange = (fieldId, value) => {
    const { state } = this
    state[fieldId] = value
    this.setState(state)
  }

  renderActivities = () => (
    <CheckboxButtonGroupComponent
      checkboxItems={this.state.deliveryActivties}
      locale={this.props.locale}
      onChange={this.handleCheckedBox}
      choiceId={false}
      label={<FormattedMessage id='deliveryActivity' />}
    />
  )

  renderTypes = driverTypes => (
    <RadioButtonGroupComponent
      groupName={<FormattedMessage id='driverType' />}
      radioItems={driverTypes}
      onChange={this.handleRadioButtonChange}
    />
  )

  renderCheck = () => (
    <Fragment>
      <FormGroupComponent>
        <FormControlComponent
          label={<FormattedMessage id='seqNoOfVeh' />}
          fieldId='snvr'
          value={this.state.snvr}
          required
          colSize={[2, 4]}
          onChange={this.handleInputChange}
        >
          <input id='snvr' type='text' />
        </FormControlComponent>
        <FormControlComponent
          label={<FormattedMessage id='ownerId' />}
          fieldId='ownerId'
          value={this.state.ownerId}
          required
          colSize={[2, 4]}
          onChange={this.handleInputChange}
        >
          <input id='ownerId' type='text' />
        </FormControlComponent>
      </FormGroupComponent>
      {this.state.carRetrieved ? null
        : (
          <div className="pageActions">
            <a className="btn btn-primary" href="#c" onClick={() => this.setState({ carRetrieved: !this.state.carRetrieved })} role="button">
              {<FormattedMessage id='validate' />}
            </a>
          </div>
        )
      }
    </Fragment>
  )

  renderAfterCheck = () => (
    <Fragment>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='vMaker' />} value={this.state.mockCarCheckObj.vMaker} colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='plateNumber' />} value={this.state.mockCarCheckObj.plateNo} colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='color' />} value={this.state.mockCarCheckObj.color} colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='plateType' />} value={this.state.mockCarCheckObj.plateType} colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='expiryDate' />} value={this.state.mockCarCheckObj.expiryDate} colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='vehicleModel' />} value={this.state.mockCarCheckObj.vModel} colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <StaticDataGroupComponent>
        {this.state.selectedDriverType === 'coOwner'
          ? <StaticDataComponent label={<FormattedMessage id='coOwner' />} value={this.state.mockCarCheckObj.coOwner} colSize={[2, 4]} />
          : this.state.selectedDriverType === 'owner'
            ? <StaticDataComponent label={<FormattedMessage id='ownerName' />} value={this.state.mockCarCheckObj.owner} colSize={[2, 4]} />
            : this.state.selectedDriverType === 'AuthDriver'
              ? (
                <Fragment>
                  <StaticDataComponent label={<FormattedMessage id='ownerName' />} value={this.state.mockCarCheckObj.owner} colSize={[2, 4]} /> 
                  <StaticDataComponent label={<FormattedMessage id='authDriver' />} value={this.state.mockCarCheckObj.AuthDriver} colSize={[2, 4]} />
                </Fragment>
              )
              : null }
        <StaticDataComponent label={<FormattedMessage id='modelYear' />} value={this.state.mockCarCheckObj.modelYear} colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <br />
      <StaticDataGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='deliveryActivityLicenseNo' />} value={this.state.mockCarCheckObj.LicenseActictityNo} colSize={[2, 4]} />
        <StaticDataComponent label={<FormattedMessage id='deliveryActivityLicenseDate' />} value={this.state.mockCarCheckObj.modelYear} colSize={[2, 4]} />
      </StaticDataGroupComponent>
      <FormGroupComponent>
        <FormControlComponent
          label={<FormattedMessage id='licenseDuration' />}
          fieldId='licenseDuration'
          value={this.state.licenseDuration}
          required
          colSize={[2, 4]}
          helpMessage={<FormattedMessage id='inYears' />}
          onChange={this.handleInputChange}
          // errorMessage={this.getError('permitType', 'required', 'REQUIRED')}
        >
          <input id='licenseDuration' type='text' />
        </FormControlComponent>
        <StaticDataComponent label={<FormattedMessage id='licenseStartDate' />} value={this.state.mockCarCheckObj.startDate} colSize={[2, 4]} />
      </FormGroupComponent>
      <FormGroupComponent>
        <StaticDataComponent label={<FormattedMessage id='licenseEndDate' />} value={this.state.mockCarCheckObj.endDate} colSize={[2, 4]} />
        <FormControlComponent
          label={<FormattedMessage id='attachment' />}
          fieldId='licenseDuration'
          value={this.state.attachment}
          required
          colSize={[2, 4]}
          onChange={this.handleInputChange}
          // errorMessage={this.getError('permitType', 'required', 'REQUIRED')}
        >
          <input id='licenseDuration' type='file' />
        </FormControlComponent>
      </FormGroupComponent>
    </Fragment>
  )

  showSuccessMsg =() => (
    <section>
      <div className="Big-message my-5 text-center">
        <i className="fa fa-check text-success" aria-hidden="true" />
        <h3 className="text-success">
          تم التسجيل بنجاح
        </h3>
        <p>
          رقم الطلب
          <b className="text-dark"> 1810255520 </b>
        </p>
        <p>
          العودة للصفحة
          <Link to="/" className="font-color">  الرئيسية </Link>
        </p>
      </div>
    </section>
  )

  render() {
    const driverTypes = [
      {
        value: <FormattedMessage id='owner' />,
        id: 'owner',
        show: true,
        checked: this.state.selectedDriverType === 'owner',
      },
      {
        value: <FormattedMessage id='coOwner' />,
        id: 'coOwner',
        show: true,
        checked: this.state.selectedDriverType === 'coOwner',
      },
      {
        value: <FormattedMessage id='authDriver' />,
        id: 'AuthDriver',
        show: true,
        checked: this.state.selectedDriverType === 'AuthDriver',
      },
    ]
    return (
      <PageContentComponent title={<FormattedMessage id='requestLicense' />}>
        {this.state.showSuccess
          ? this.showSuccessMsg()
          : (
            <Fragment>
              <SubtitleComponent title={<FormattedMessage id='requestInfo' />} isFirst />
              {this.renderActivities()}
              {this.renderTypes(driverTypes)}
              {this.renderCheck()}
              {this.state.carRetrieved ? (
                <Fragment>
                  <SubtitleComponent title={<FormattedMessage id='carInfo' />} />
                  {this.renderAfterCheck()}
                  <div className="pageActions">
                    <Link to='/contractManagement'>
                      <button id='goBack' type='submit' className='btn btn-secondary'>
                        <FormattedMessage id='back' />
                      </button>
                    </Link>
                    <button type='submit' className="btn btn-primary" onClick={() => { this.setState({ showSuccess: true }) }}>
                      <FormattedMessage id='save' />
                    </button>
                  </div>
                </Fragment>
              ) : null}
            </Fragment>
          )}
      </PageContentComponent>
    )
  }
}

LicenseRequest.prototypes = {
  locale: PropTypes.string.isRequired,
}
