import React from 'react'
import Button from '../gov-uk-components/Button'
export default function InactivityPopup({ onStayLoggedIn }) {
  return (
    <div className="govuk-grid">
      <div className="inactivity-warning-content">
        <h3 class="govuk-heading-s">Youre about to be signed out</h3>
        <p class="govuk-body">
          For your security we will sign you out in 2 minutes
        </p>
        <Button
          className={'govuk-button'}
          onClick={onStayLoggedIn}
          text={'Stay signed in'}
        />
        <p class="govuk-body">
          <a href="/signout" class="govuk-link">
            Sign out
          </a>
          .
        </p>
      </div>
    </div>
  )
}
