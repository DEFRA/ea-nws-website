import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../../common/components/gov-uk/Button'

export default function SkipConfirmMobilePhonePage () {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const mobile = useSelector(
    (state) => state.session.profile.unverified.mobilePhones[0]
  )

  function handleSubmit () {
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
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <Link
                to='/signup/contactpreferences/mobile/validate'
                className='govuk-back-link'
              >
                Back
              </Link>
              <h1 className='govuk-heading-l govuk-!-margin-top-6'>
                We cannot send flood messages to {mobile} until you confirm this
                number
              </h1>
              <Button
                text={"I'll confirm this later"}
                className='govuk-button'
                onClick={handleSubmit}
              />
              &nbsp; &nbsp;
              <Link
                to='/signup/contactpreferences/mobile/validate'
                className='govuk-body govuk-link'
                style={{
                  display: 'inline-block',
                  padding: '8px 10px 7px'
                }}
              >
                Confirm now
              </Link>
            </div>
          </div>
    </>
  )
}
