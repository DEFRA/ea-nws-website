import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'

export default function SkipConfirmMobilePhonePage () {
  const location = useLocation()

  function handleSubmit () {
    // if user selected email - navigate to email
    // else if user selected landline - navigate to landline
    // else navigate to addtional details page
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <PhaseBanner />
            <Link
              to='/signup/contactpreferences/mobile/validate'
              state={{
                mobile: location.state.mobile
              }}
              className='govuk-back-link'
            >
              Back
            </Link>
            <h1 className='govuk-heading-l govuk-!-margin-top-6'>
              We cannot send flood messages to {location.state.mobile} until you
              confirm this number
            </h1>
            <Button
              text={"I'll confirm this later"}
              className='govuk-button'
              onClick={handleSubmit}
            />
            &nbsp; &nbsp;
            <Link
              to='/signup/contactpreferences/mobile/validate'
              state={{
                mobile: location.state.mobile
              }}
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
