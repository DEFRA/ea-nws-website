import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function FloodWarningKey ({ type }) {
  return (
    <>
      <div className='flood-warning-key govuk-!-margin-top-6'>
        <b>Key</b>{' '}
        {type === 'both' && (
          <>
            <FontAwesomeIcon
              icon={faCircle}
              className='govuk-!-padding-left-1 govuk-!-padding-right-1'
              style={{ color: '#f70202' }}
            />{' '}
            Severe flood warnings and flood warnings area
            <FontAwesomeIcon
              icon={faCircle}
              className='govuk-!-padding-left-7 govuk-!-padding-right-1'
              style={{ color: '#ffa200' }}
            />{' '}
            Flood alert area
          </>
        )}
        {type === 'severe' && (
          <>
            <FontAwesomeIcon
              icon={faCircle}
              className='govuk-!-padding-left-1 govuk-!-padding-right-1'
              style={{ color: '#f70202' }}
            />{' '}
            Severe flood warnings and flood warnings area
          </>
        )}
        {type === 'alert' && (
          <>
            <FontAwesomeIcon
              icon={faCircle}
              className='govuk-!-padding-left-1 govuk-!-padding-right-1'
              style={{ color: '#ffa200' }}
            />{' '}
            Flood alert area
          </>
        )}
      </div>
    </>
  )
}
