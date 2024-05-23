import React from 'react'
import Button from '../../gov-uk-components/Button'
export default function signOutLayout(text, redirect) {
  return (
    <div>
      <h2 className="govuk-heading-l">{text}</h2>
      <p className="govuk-body">You can sign back in if you need to.</p>
      <Button text={'Sign in'} className={'govuk-button'} onClick={redirect} />

      <h3 className="govuk-heading-s">More about flooding</h3>

      <p className="govuk-body">
        Find out how to{' '}
        <a href="#" className="govuk-link">
          protect yourself and your property online from flooding
        </a>
        .
      </p>

      <p className="govuk-body">
        <a href="#" className="govuk-link">
          What do you think of this service?
        </a>
        {''} Takes 30 seconds
      </p>
    </div>
  )
}
