

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './Badge.css'
import {FormattedMessage} from 'react-intl'
const types = {
  
  'ACTIVE': {class: 'badge-success'},
  'INACTIVE': {class: 'badge-default'},
  
}
const BadgeComponent = (props) => {
  const type = types[props.type]
  const className = classnames('badge', type.class)
  const Fragment = React.Fragment
  return (
    <Fragment>
      <span className={className}><FormattedMessage id={props.type}/></span>
    </Fragment>
  )
}

BadgeComponent.propTypes = {
  type: PropTypes.oneOf(
    ['NEW', 'CONFIRMED', 'WAITING_CR', 'ACTIVE','REJECTED', 'CANCELLED', 'SUSPENDED', 'INACTIVE', 'LOCKED','UNCONFIRMED']
  ).isRequired,
}

export default BadgeComponent
