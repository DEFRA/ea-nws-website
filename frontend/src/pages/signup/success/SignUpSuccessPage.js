import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Input from '../../../gov-uk-components/Input'
import InsetText from '../../../gov-uk-components/InsetText'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { setProfile, setRegisterToken } from '../../../redux/userSlice'
import { backendCall } from '../../../services/BackendService'
import { emailValidation } from '../../../services/validations/EmailValidation'
import NotificationBanner from '../../../gov-uk-components/NotificationBanner'
import ConfirmationPanel from '../../../gov-uk-components/ConfirmationPanel'

export default function SignUpPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
   
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <Link onClick={() => navigate(-1)} className='govuk-back-link'>
          Back
        </Link>
          ? (
            <ConfirmationPanel
              className='govuk-panel govuk-panel--confirmation'
              title={'Your flood messages are set up'}
              body={'you have also created your account.'}
            />
            )
        <div className='govuk-body'>
          <p>
            We have sent you an email confirmation. If you have not received this within 2 < br/> hours, check your spam.
          </p>
          <h1 class='govuk-heading-m'>Next Steps</h1>
          <p>
            You'll now receive flood messages for your location. If any are issued.
          </p>
          <p>
            These will be sent from Floodline at the Environment Agency.
          </p>
          <br />
        </div>
      </div>
      <Footer />
    </>
  )
}
