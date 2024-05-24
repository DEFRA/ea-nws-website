import * as React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../gov-uk-components/Button'
import Footer from '../../../../gov-uk-components/Footer'
import Header from '../../../../gov-uk-components/Header'
import PhaseBanner from '../../../../gov-uk-components/PhaseBanner'

export default function SkipConfirmMobilePhonePage () {
  const data = useLocation()
  const navigate = useNavigate()

  function handleSubmit () {}

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
                mobile: data.state.mobile
              }}
              className='govuk-back-link'
            >
              Back
            </Link>
            <h1 className='govuk-heading-l govuk-!-margin-top-6'>
              We cannot send flood messages to {data.state.mobile} until you
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
