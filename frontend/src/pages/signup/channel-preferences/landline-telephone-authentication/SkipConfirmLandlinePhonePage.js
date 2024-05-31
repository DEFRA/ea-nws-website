import * as React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'

export default function SkipConfirmLandlinePhonePage () {
  const location = useLocation()
  const navigate = useNavigate()
  // TODO
  function handleSubmit () {
    navigate('/')
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <div class='govuk-grid-row'>
          <div class='govuk-grid-column-two-thirds'>
            <PhaseBanner />
            <Link
              to='/signup/contactpreferences/landline/validate'
              state={{ phoneNumber: location.state.phoneNumber }}
              className='govuk-back-link'
            >
              Back
            </Link>
            <h1 class='govuk-heading-l govuk-!-margin-top-6'>
              We cannot send flood messages to {location.state.phoneNumber}{' '}
              until you confirm this number
            </h1>
            <Button
              text={"I'll confirm this later"}
              className='govuk-button'
              onClick={handleSubmit}
            />
            &nbsp; &nbsp;
            <Link
              to='/signup/contactpreferences/landline/validate'
              state={{ phoneNumber: location.state.phoneNumber }}
              className='govuk-body govuk-link'
            >
              Confirm now
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
