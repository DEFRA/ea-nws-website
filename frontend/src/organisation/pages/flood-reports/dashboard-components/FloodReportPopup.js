import React from 'react'
import { Link } from 'react-router-dom'
import Popup from '../../../../common/components/custom/Popup'

export default function FloodReportPopup({ onClose, title, warnings }) {
  return (
    <>
      <Popup
        title={title}
        onClose={onClose}
        popupText={
          <>
            {' '}
            <div className='flood-warning-popup-tab-group'>
              <span className='flood-warning-popup-tab selected'>Live</span>
              <span className='flood-warning-popup-tab'>Timeline</span>
            </div>
            {warnings.map((warning, index) => (
              <div
                key={index}
                className={`flood-warning-card ${
                  warning.type === 'Severe flood warning' ? 'severe' : 'alert'
                }`}
              >
                <p className='govuk-body'>
                  <strong>Type:</strong> {warning.type}
                </p>
                <p className='govuk-body'>
                  <strong>Flood area:</strong> *flood area*
                </p>
                <p className='govuk-body'>
                  <strong>Area code:</strong> *area code*
                </p>
                <p className='govuk-body'>Updated *updated* </p>
                <Link to='#' className='govuk-link'>
                  View warning (opens in new tab)
                </Link>
              </div>
            ))}
          </>
        }
        buttonText='Close'
        buttonClass='govuk-button'
      />
    </>
  )
}
