import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../common/assets/images/flood_warning.svg'
import Popup from '../../../../common/components/custom/Popup'

export default function FloodReportPopup({ onClose, title, warning }) {
  const [activeTab, setActiveTab] = useState('Live')

  return (
    <>
      <Popup
        title={title}
        onDelete={onClose}
        onClose={onClose}
        popupText={
          <>
            {/* Tabs */}
            <div className='flood-warning-popup-tab-group'>
              <span
                className={`flood-warning-popup-tab ${
                  activeTab === 'Live' ? 'selected' : ''
                }`}
                onClick={() => setActiveTab('Live')}
              >
                Live
              </span>
              <span
                className={`flood-warning-popup-tab ${
                  activeTab === 'Timeline' ? 'selected' : ''
                }`}
                onClick={() => setActiveTab('Timeline')}
              >
                Timeline
              </span>
              <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3 section-break-bold' />
            </div>

            {/* Warnings */}
            {activeTab === 'Live' &&
              warning.alert_categories.map((warningType, index) => {
                const cardClass =
                  warningType === 'Alert'
                    ? 'flood-warning-card alert'
                    : 'flood-warning-card'
                const cardIcon =
                  warningType === 'Alert' ? floodAlertIcon : floodWarningIcon
                const cardAltText =
                  warningType === 'Alert'
                    ? 'Flood alert icon'
                    : 'Flood warning icon'

                return (
                  <div key={index}>
                    {/* TODO: Integrate real warning data available */}
                    <div className={cardClass}>
                      <div className='flood-warning-card-content'>
                        <img
                          src={cardIcon}
                          alt={cardAltText}
                          className='flood-warning-card-icon'
                        />
                        <div className='flood-warning-card-text'>
                          <p className='govuk-body'>
                            <strong>Type</strong>{' '}
                          </p>
                          <p className='govuk-body'>
                            <strong>Flood area </strong>{' '}
                          </p>
                          <p className='govuk-body'>
                            <strong>Area code</strong>{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className='govuk-body'>Updated</p>
                    <Link to='#' className='govuk-link'>
                      View warning (opens in new tab)
                    </Link>
                  </div>
                )
              })}

            {/* TODO: Create timeline tab*/}
          </>
        }
        buttonText='Close'
        buttonClass='govuk-button'
        showCancel={false}
      />
    </>
  )
}
