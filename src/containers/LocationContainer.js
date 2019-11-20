import {connect} from 'react-redux'
import LocationComponent from '../components/Location/LocationComponent'

const mapStateToProps = (state) => {
  return {
    locale: state.locale.currentLocale
  }
}

const LocationContainer = connect( 
  mapStateToProps
)(LocationComponent)

export default LocationContainer
