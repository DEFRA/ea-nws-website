import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import ConfirmationPanel from '../../../gov-uk-components/ConfirmationPanel'

export default function SignUpPage () {
  const navigate = useNavigate()
  const handleSubmit = async () => {
   
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <Link onClick={() => navigate(-1)} className='govuk-back-link'>Back</Link>
        <ConfirmationPanel
          className='govuk-panel govuk-panel--confirmation'
          title={'Your flood messages are set up'}
          body={'you have also created your account.'}
        /><br />
        <div className='govuk-body'>
          <p>
            We have sent you an email confirmation. If you have not received this within 2 < br/> hours, check your spam.
          </p><br />
          <h1 class='govuk-heading-m'>Next Steps</h1>
          <p>
            You'll now receive flood messages for your location. If any are issued.
          </p><br />
          <p>
            These will be sent from Floodline at the Environment Agency.
          </p><br />
          <h2 class='govuk-heading-m'>If you want to add more locations or contacts</h2>
          <p className='govuk-body'>
            You can now use your account to add more{' '}
            <a href='/' className='govuk-link'>
              locations.
            </a>
          </p><br />
          <p>
            You can also add more {' '}
            <a href='/' className='govuk-link'>
             email addresses or phone numbers 
            </a>
            to receive flood <br /> messages.
          </p><br />
          <p>
             {' '}
            <a href='/' className='govuk-link'>
             What do you think of the service?
            </a>
            (takes 30 seconds)
          </p>
          <br />
        </div>
      </div>
      <Footer />
    </>
  )
}
