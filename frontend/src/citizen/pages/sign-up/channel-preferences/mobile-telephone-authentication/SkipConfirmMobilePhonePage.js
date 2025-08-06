import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'

export default function SkipConfirmMobilePhonePage() {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const mobile = useSelector(
    (state) => state.session.profile.unverified.mobilePhones[0].address
  )

  function skipConfirm(event) {
    event.preventDefault()
    if (session.contactPreferences.includes('PhoneCall')) {
      navigate('/signup/contactpreferences/landline/add')
    } else {
      navigate('/signup/accountname/add')
    }
  }

  return (
    <>
      <Helmet>
        <title>
          We cannot send flood messages to this number yet - Get flood warnings
          - GOV.UK
        </title>
      </Helmet>
      <BackLink to='/signup/contactpreferences/mobile/validate' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l' id='main-content'>
              We cannot send flood messages to {mobile} until you confirm this
              number
            </h1>
            <Button
              text="I'll confirm this later"
              className='govuk-button govuk-!-margin-right-2'
              onClick={skipConfirm}
            />
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
