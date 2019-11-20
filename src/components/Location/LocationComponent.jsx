import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Gmaps, Marker } from 'react-gmaps'
import { geolocated, geoPropTypes } from 'react-geolocated'
import axios from 'axios'
import PropTypes from 'prop-types'
import './Location.css'
import { AR } from '../../constants/LocaleConstants'

const KSA_BOUNDS = {
  maxLat: 32.154284, minLat: 16.0036, maxLng: 55.6666999, minLng: 34.5299999,
}
const DEFAULT_LOCATION = { lat: 24.712997537543572, lng: 46.67235236596753 }
const MIN_ZOOM_LEVEL = 5

class LocationComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      region: null,
      city: null,
      route: null,
      district: null,
      currentLocation: { lat: this.props.lat, lng: this.props.lng },
      map: null,
      mapZoom: 14,
      lang: this.props.locale,
      outOfKSA: false,
      invalidLocation: false,
    }
    this.onMapCreated = this.onMapCreated.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.getAddressComponent = this.getAddressComponent.bind(this)
    this.onClick = this.onClick.bind(this)
    this.setLocationDetails = this.setLocationDetails.bind(this)
    this.clearLocationDetails = this.clearLocationDetails.bind(this)
    this.onZoomChanged = this.onZoomChanged.bind(this)
  }

  onMapCreated(map) {
    
    map.setOptions({
      disableDefaultUI: true,
      clickableIcons: false,
      minZoom: MIN_ZOOM_LEVEL,
      styles: [
        { featureType: 'administrative.country', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'water', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
    })
    if (!this.props.isEditable) {
      map.setOptions({ draggable: false })
      this.setState({ mapZoom: 11 })
    }
    this.setState({ map })
  }

  onDragEnd() {
    let centerLat = this.state.map.getCenter().lat()
    let centerLng = this.state.map.getCenter().lng()
    if (centerLat > KSA_BOUNDS.maxLat) { centerLat = KSA_BOUNDS.maxLat }
    if (centerLat < KSA_BOUNDS.minLat) { centerLat = KSA_BOUNDS.minLat }
    if (centerLng > KSA_BOUNDS.maxLng) { centerLng = KSA_BOUNDS.maxLng }
    if (centerLng < KSA_BOUNDS.minLng) { centerLng = KSA_BOUNDS.minLng }
    this.state.map.setCenter({ lat: centerLat, lng: centerLng })
  }

  onZoomChanged() {
    const minZoom = 11
    if (!this.props.isEditable && this.state.map.getZoom() < minZoom) {
      this.setState({ mapZoom: minZoom })
    }
  }

  onClick(e) {
    if (!this.props.isEditable) {
      return
    }
    const currentZoomLevel = this.state.map.getZoom()
    this.setState({
      currentLocation: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      mapZoom: currentZoomLevel,
    })
    this.setLocationDetails(this.props.locale)
  }

  componentWillUnmount() {
    window.removeEventListener('onClick', this.onClick, false)
    window.removeEventListener('onMapCreated', this.onMapCreated, false)
    window.removeEventListener('onDragEnd', this.onDragEnd, false)
    window.removeEventListener('onZoomChanged', this.onZoomChanged, false)
  }

  setLocationDetails(lang) {
    const axiosInstance = axios.create({ headers: {} }) // remove field X-Requested-With frome header for geocode APIs request because it is not allowed by Access-Control-Allow-Headers in preflight response.
    if (lang !== 'ar') { // get city arabic name
      axiosInstance.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentLocation.lat},${this.state.currentLocation.lng}&sensor=true&language=ar&key=AIzaSyCpzpgVwC_wkPhHV_ye9B1xs9FF7aQ6PMA`)
        .then((response) => {
          if (response.data.status === 'OK') {
            const address = response.data.results[1].address_components
            const selectedCity = this.getAddressComponent(address, 'locality')
            const selectedRegion = this.getAddressComponent(address, 'administrative_area_level_1')
            const selectedDestrict = this.getAddressComponent(address, 'sublocality')
            this.props.handleFieldUpdate('cityAr', selectedCity)
            this.props.handleFieldUpdate('regionAr', selectedRegion)
            this.props.handleFieldUpdate('districtAr', selectedDestrict)
          }
        }).catch(error => /* TODO:catchError) */ error)
    }

    if (lang == 'ar') { // get city arabic name
      axiosInstance.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentLocation.lat},${this.state.currentLocation.lng}&sensor=true&language=en&key=AIzaSyCpzpgVwC_wkPhHV_ye9B1xs9FF7aQ6PMA`)
        .then((response) => {
          if (response.data.status === 'OK') {
            const address = response.data.results[1].address_components
            const selectedCity = this.getAddressComponent(address, 'locality')
            const selectedRegion = this.getAddressComponent(address, 'administrative_area_level_1')
            const selectedDestrict = this.getAddressComponent(address, 'sublocality')
            this.props.handleFieldUpdate('cityEn', selectedCity)
            this.props.handleFieldUpdate('regionEn', selectedRegion)
            this.props.handleFieldUpdate('districtEn', selectedDestrict)
          }
        }).catch(error => /* TODO:catchError) */ error)
    }
    axiosInstance.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentLocation.lat},${this.state.currentLocation.lng}&sensor=true&language=${lang}&key=AIzaSyCpzpgVwC_wkPhHV_ye9B1xs9FF7aQ6PMA`)
      .then((response) => {
        if (response.data.status === 'OK') {
          const address = response.data.results[1].address_components
          const comp = address.find(element => element.types.includes('country'))
          if (comp && comp.short_name !== 'SA') {
            this.setState({ outOfKSA: true, invalidLocation: false, ...this.clearLocationDetails() })
            this.props.handleFieldUpdate('location', false)
          } else {
            const selectedRegion = this.getAddressComponent(address, 'administrative_area_level_1')
            let selectedCity = this.getAddressComponent(address, 'locality')
            if (selectedCity === '') {
              selectedCity = this.getAddressComponent(address, 'administrative_area_level_2')
            }
            if (selectedRegion === '' || selectedCity === '') {
              this.setState({ outOfKSA: false, invalidLocation: true, ...this.clearLocationDetails() }) 
            this.props.handleFieldUpdate('location', false)
              return
            }
            let route = this.getAddressComponent(response.data.results[0].address_components, 'route')
            if (route === 'Unnamed Road') {
              route = ''
            }
            const location = {
              lat: this.state.currentLocation.lat,
              lng: this.state.currentLocation.lng,
              region: selectedRegion,
              city: selectedCity,
              district: this.getAddressComponent(address, 'sublocality'),
              route,
            }
            if (this.props.handleFieldUpdate) {
              this.props.handleFieldUpdate('location', true)
              this.props.handleFieldUpdate('lat', location.lat)
              this.props.handleFieldUpdate('lng', location.lng)
              if (this.props.locale === AR) {
                this.props.handleFieldUpdate('cityAr', location.city)
                this.props.handleFieldUpdate('districtAr', location.district)
                this.props.handleFieldUpdate('streetAr', location.route)
                this.props.handleFieldUpdate('region', location.region)
              } else {
                this.props.handleFieldUpdate('cityEn', location.city)
                this.props.handleFieldUpdate('districtEn', location.district)
                this.props.handleFieldUpdate('streetEn', location.route)
                this.props.handleFieldUpdate('regionEn', location.region)
              }
            }
            this.setState({ outOfKSA: false, invalidLocation: false, ...location })
          }
        } else {
          this.setState({ invalidLocation: true, outOfKSA: false, ...this.clearLocationDetails() })
          this.props.handleFieldUpdate('location', false)
        }
      })
      .catch(error => /* TODO:catchError) */ error)
    }

  getAddressComponent(address, type) {
    const comp = address.find(element => element.types.includes(type))
    if (comp) {
      return comp.long_name
    }
    return ''
  }

  clearLocationDetails() {
    return {
      lat: '', lng: '', region: '', city: '', route: '', district: '',
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.isEditable || this.props.lat || this.props.lng) {
      this.setLocationDetails(newProps.locale)
      return
    }
    if (newProps.isGeolocationAvailable && newProps.isGeolocationEnabled && newProps.coords) {
      this.setState({
        currentLocation: { lat: newProps.coords.latitude, lng: newProps.coords.longitude },
      })
      this.setLocationDetails(newProps.locale)
    }
    if (this.state.lat && this.state.lng) {
      this.setLocationDetails(newProps.locale)
    }
  }

  componentDidMount() {
    if (!this.props.isEditable || this.props.lat || this.props.lng) {
      this.setState({
        currentLocation: { lat: this.props.lat, lng: this.props.lng },
      })
      return
    }
    this.setState({
      currentLocation: DEFAULT_LOCATION,
    })
  }

  render() {
    return (
      <div className='formGroup'>
        <label className='col-md-2 col-sm-3 controlLabel'>
          <FormattedMessage id="selectAddressFromMap" />
          {this.state.outOfKSA ? <span className='error'> <FormattedMessage id="outOfKSA" /></span> : null}
          {this.state.invalidLocation ? <span className='error'> <FormattedMessage id="invalidLocation" /></span> : null}
        </label>
        <div className="col-md-10 col-sm-9">
          <div className={this.state.outOfKSA || this.state.invalidLocation ? 'addressDetailsError' : 'addressDetails'}>
            <div id="gmap_canvas" className='mapContainer' >
              <Gmaps
                width="100%"
                height="100%"
                lat={this.state.currentLocation.lat}
                lng={this.state.currentLocation.lng}
                zoom={this.state.mapZoom}
                loadingMessage="loading"
                onClick={this.onClick}
                params={{ v: '3.exp', key: 'AIzaSyCpzpgVwC_wkPhHV_ye9B1xs9FF7aQ6PMA' }}
                onMapCreated={this.onMapCreated}
                onDragEnd={this.onDragEnd}
                onZoomChanged={this.onZoomChanged}
              >
                <Marker
                  lat={this.state.currentLocation.lat}
                  lng={this.state.currentLocation.lng}
                  draggable={false}
                />
              </Gmaps>
            </div>
            <div className='mapLocation'>
              <div className="row">
                <div className="col-md-2"><label className='staticLabels'><FormattedMessage id="lat" /></label></div>
                <div className="col-md-4"><div className='formControlStatic'>{this.state.lat}</div></div>
                <div className="col-md-2"><label className='staticLabels'><FormattedMessage id="lng" /></label></div>
                <div className="col-md-4"><div className='formControlStatic'>{this.state.lng}</div></div>
              </div>
              <div className="row">
                <div className="col-md-2"><label className='staticLabels'><FormattedMessage id="region" /></label></div>
                <div className="col-md-4"><div className='formControlStatic'>{this.state.region}</div></div>
                <div className="col-md-2"><label className='staticLabels'><FormattedMessage id="city" /></label></div>
                <div className="col-md-4"><div className='formControlStatic'>{this.state.city}</div></div>
              </div>
              <div className="row">
                <div className="col-md-2"><label className='staticLabels'><FormattedMessage id="district" /></label></div>
                <div className="col-md-4"><div className='formControlStatic'>{this.state.district}</div></div>
                <div className="col-md-2"><label className='staticLabels'><FormattedMessage id="street" /></label></div>
                <div className="col-md-4"><div className='formControlStatic'>{this.state.route}</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
} export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 15000,
})(LocationComponent)

LocationComponent.propTypes = {
  ...LocationComponent.propTypes,
  ...geoPropTypes,
  isEditable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  lat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  lng: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleFieldUpdate: PropTypes.func,
}
LocationComponent.defaultProps = {
  lat: null,
  lng: null,
  isEditable: true,
}
