import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { isMobile } from 'react-device-detect'

export default function FloodWarningKey({ type }) {
  // Larger circle for mobile, default otherwise
  const iconSize = isMobile ? 'xl' : 'lg'

  return (
    <>
      <div
        className={`flood-warning-key govuk-!-margin-top-6 ${
          isMobile && 'flood-warning-key-mobile'
        }`}
      >
        {/* Space needed between "Key" and icon on mobile */}
        <b className='govuk-!-margin-right-1'>Key</b>
        {type === 'both' && (
          <>
            <FontAwesomeIcon
              icon={faCircle}
              className='govuk-!-padding-left-1 govuk-!-padding-right-1 warning-key-color'
              size={iconSize}
            />{' '}
            Severe flood warnings and flood warnings area
            <FontAwesomeIcon
              icon={faCircle}
              className='govuk-!-padding-left-7 govuk-!-padding-right-1 alert-key-color'
              size={iconSize}
            />{' '}
            Flood alert area
          </>
        )}
        {type === 'severe' && (
          <>
            <FontAwesomeIcon
              icon={faCircle}
              className='govuk-!-padding-left-1 govuk-!-padding-right-1 warning-key-color'
              size={iconSize}
            />{' '}
            Severe flood warnings and flood warnings area
          </>
        )}
        {type === 'alert' && (
          <>
            <FontAwesomeIcon
              icon={faCircle}
              className='govuk-!-padding-left-1 govuk-!-padding-right-1 alert-key-color'
              size={iconSize}
            />{' '}
            Flood alert area
          </>
        )}
      </div>
    </>
  )
}
