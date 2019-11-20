import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import SubTitle from '../Subtitle/SubtitleComponent'
import StaticDataGroupComponent from '../Form/StaticDataGroupComponent'
import './Filepicker.css'
import { AR } from '../../constants/LocaleConstants'
import StaticAttachmentComponent from '../Form/StaticAttachmentComponent'

export default class DisplayAttachments extends React.Component {
  renderAttachmentsData() {
    const { attachments, isAuthElm, isAuthContract } = this.props
    const title = <FormattedMessage id='attachments' />
    return (
      <div>
        <SubTitle title={title} />
        {attachments == null ?
          <FormattedMessage id='attachmentNotFound' /> :
          <StaticDataGroupComponent className='staticLabels'>
            {attachments.map((attachment, index) => (
              isAuthElm && attachment.attachmentConfig.attachmentTypeEn === 'Ownership' ? null : <StaticAttachmentComponent
                id={index}
                label={this.props.locale === AR ?
                  attachment.attachmentConfig.attachmentTypeAr :
                  attachment.attachmentConfig.attachmentTypeEn}
                value={<FormattedMessage id='view' />}
                colSize={[4, 2]}
                hasLink={'/api/v1/ftp/' + attachment.requestID + '/' + attachment.attachmentType}
              />
            ))
            }
          </StaticDataGroupComponent>}
      </div>
    )
  }
  renderAttachmentsDataForTemp() {
    const title = <FormattedMessage id='attachments' />
    const { attachments } = this.props
    return (
      <div>
        <SubTitle title={title} />
        <StaticDataGroupComponent className='staticLabels'>
          {attachments.map((attachment, i) => (
            <StaticAttachmentComponent
              id={i}
              label={<FormattedMessage id={attachment.attachmentType} />}
              value={<FormattedMessage id='view' />}
              colSize={[4, 2]}
              hasLink={'/api/v1/ftp/temp/' + attachment.attachmentExt + '/' + attachment.attachmentSystemFileName}
            />
          ))
          }
        </StaticDataGroupComponent>
      </div>
    )
  }
  render() {
    return (
      this.props.isTemp ? this.renderAttachmentsDataForTemp() : this.renderAttachmentsData()
    )
  }
}
DisplayAttachments.propTypes = {
  attachments: PropTypes.array,
  registerationNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  locale: PropTypes.string,
  isTemp: PropTypes.bool,
}
DisplayAttachments.defaultProps = {
  isTemp: false,
}
