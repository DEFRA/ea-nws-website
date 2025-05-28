import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'

export default function SkipConfirmLandlinePhonePage () {
  const navigate = useNavigate()

  const homePhone = useSelector(
    (state) => state.session.profile.unverified.homePhones[0].address
  )

  function skipConfirm (event) {
    event.preventDefault()
    navigate('/signup/accountname/add')
  }

  return (
    <>
      <Helmet>
        <title>You must confirm this number - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink to='/signup/contactpreferences/landline/validate' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              We cannot send flood messages to {homePhone} until you confirm
              this number
            </h1>
            <Button
              text="I'll confirm this later"
              className='govuk-button'
              onClick={skipConfirm}
            />
            &nbsp; &nbsp;
            <Link
              to='/signup/contactpreferences/landline/validate'
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
