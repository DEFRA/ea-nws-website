import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'

export default function SkipConfirmLayout (contactPreference) {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)

  function handleSubmit (event) {
    event.preventDefault()
    // navigate through sign up flow
    if (session.contactPreferences.includes('Email')) {
      // navigate to email TODO - cameron add this once merged
    } else if (session.contactPreferences.includes('PhoneCall')) {
      navigate('/signup/contactpreferences/landline/add')
    } else {
      navigate('/signup/accountname/add')
    }
  }

  return (
    <>

      <BackLink to='/signup/contactpreferences/mobile/validate' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              We cannot send flood messages to {contactPreference} until you confirm this

            </h1>
            <Button
              text="I'll confirm this later"
              className='govuk-button'
              onClick={handleSubmit}
            />
            &nbsp; &nbsp;
            <Link
              to='/signup/contactpreferences/mobile/validate'
              className='govuk-body govuk-link inline-link'
              style={{ cursor: 'pointer' }}
            >
              Confirm now
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
