import React from 'react'
import Button from '../gov-uk-components/Button'
export default function InactivityPopup ({ onStayLoggedIn }) {
  return (
    <div
      className='hmrc-timeout-dialog'
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: '#0B0C0C99',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000'

      }}
    >
      <div
        className='hmrc-timeout-dialog'
        style={{
          backgroundColor: 'white',
          borderStyle: 'solid',
          borderWidth: 'medium',
          padding: '1.5rem'
        }}
      >
        <h3 class='govuk-heading-s'>Youre about to be signed out</h3>
        <p class='govuk-body'>
          For your security we will sign you out in 2 minutes
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap:'2rem'
          }}
        >
          <Button
            className='govuk-button dialog'
            onClick={onStayLoggedIn}
            text='Stay signed in'
          />
          <p
            class='govuk-body'
            style={{
              paddingRight:'9rem',
              marginTop: '0.3rem',
              
            }}
          >
            <a href='/signout' class='govuk-link'>
              Sign out
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
