import * as React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'

export default function SkipConfirmLandlinePhonePage () {
  const navigate = useNavigate()

  const homePhone = useSelector(
    (state) => state.session.profile.unverified.homePhones[0].address
  )

  function skipConfirm () {
    navigate('/signup/accountname/add')
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <div class='govuk-grid-row'>
            <div class='govuk-grid-column-two-thirds'>
              <Link
                to='/signup/contactpreferences/landline/validate'
                className='govuk-back-link'
              >
                Back
              </Link>
              <h1 class='govuk-heading-l govuk-!-margin-top-6'>
                We cannot send flood messages to {homePhone} until you confirm
                this number
              </h1>
              <Button
                text={"I'll confirm this later"}
                className='govuk-button'
                onClick={skipConfirm}
              />
              &nbsp; &nbsp;
              <Link
                to='/signup/contactpreferences/landline/validate'
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
        </div>
        <Footer />
      </div>
    </>
  )
}
