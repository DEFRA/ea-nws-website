import React from 'react'
import Button from '../../gov-uk-components/Button'
export default function signOutLayout(text, redirect) {
  return (
    <div>
      <h2 class="govuk-heading-l">{text}</h2>
      <p class="govuk-body">You can sign back in if you need to.</p>
      <Button text={'Sign in'} className={'govuk-button'} onClick={redirect} />

      <h3 class="govuk-heading-s">More about flooding</h3>

      <p class="govuk-body">
        Find out how to{' '}
        <a href="#" class="govuk-link">
          protect yourself and your property online from flooding
        </a>
        .
      </p>

      <p class="govuk-body">
        <a href="#" class="govuk-link">
          What do you think of this service?
        </a>
        {''} Takes 30 seconds
      </p>
    </div>
  )
}
