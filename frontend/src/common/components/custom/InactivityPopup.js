import React from 'react'
import '../../css/custom.css'
import Button from '../gov-uk/Button'
export default function InactivityPopup ({ onStayLoggedIn }) {
  return (
    <div className='timeout-dialog'>
      <div className='timeout-dialog-container'>
        <h3 className='govuk-heading-s'>You're about to be signed out</h3>
        <p className='govuk-body'>
          For your security we will sign you out in 2 minutes
        </p>
        <div className='timeout-dialog-flex'>
          <Button
            className='govuk-button dialog'
            onClick={onStayLoggedIn}
            text='Stay signed in'
          />
          <p className='govuk-body timeout-dialog-link inline-link'>
            <a href='/signout' class='govuk-link'>
              Sign out
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
