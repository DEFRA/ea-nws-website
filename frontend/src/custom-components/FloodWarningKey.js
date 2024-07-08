import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import '../custom.css'

export default function FloodWarningKey ({ severe }) {
  return (
    <>
      {severe
        ? (
          <div className='flood-warning-key govuk-!-margin-top-6'>
            <b>Key</b>{' '}
            <FontAwesomeIcon
              icon={faCircle}
              className='govuk-!-padding-left-1 govuk-!-padding-right-1'
              style={{ color: '#f70202' }}
            />{' '}
            Severe flood warnings and flood warnings area
          </div>
          )
        : (
          <div className='flood-warning-key govuk-!-margin-top-6'>
            <b>Key</b>{' '}
            <FontAwesomeIcon
              icon={faCircle}
              className='govuk-!-padding-left-1 govuk-!-padding-right-1'
              style={{ color: '#ffa200' }}
            />{' '}
            Flood alert area
          </div>
          )}
    </>
  )
}
