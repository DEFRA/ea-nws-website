import React from 'react'
import Button from '../gov-uk-components/Button'
export default function InactivityPopup({ onStayLoggedIn }) {
  return (
    <div
      className="hmrc-timeout-dialog"
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'RGBA(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '1000',
        backdropFilter: 'blur(5px)'
      }}
    >
      <div
        className="hmrc-timeout-dialog"
        style={{
          backgroundColor: 'white',
          borderStyle: 'solid',
          borderWidth: 'medium',
          padding: '20px'
        }}
      >
        <h3 class="govuk-heading-s">Youre about to be signed out</h3>
        <p class="govuk-body">
          For your security we will sign you out in 2 minutes
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            className="govuk-button"
            onClick={onStayLoggedIn}
            text="Stay signed in"
          />
          <p
            class="govuk-body"
            style={{
              marginRight: '40%',
              marginTop: '1%'
            }}
          >
            <a href="/signout" class="govuk-link">
              Sign out
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
