import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Input from '../../../gov-uk-components/Input'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../../redux/userSlice'
import { addAccountName } from '../../../services/ProfileServices'
import { fullNameValidation } from '../../../services/validations/FullNameValidation'
export default function AddNamePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const [fullName, setFullName] = useState(
    location.state ? location.state.fullName : ''
  )
  const [error, setError] = useState('')
  const session = useSelector((state) => state.session)

  const handleSubmit = async () => {
    const validationError = fullNameValidation(fullName, 'fullName')
    setError(validationError)

    if (validationError === '') {
      // Split the full name into first name and last name assuming they are separeted by a space.
      // if the string cannot be split then only the first name is set and the last name remains blank
      var firstName = fullName
      var lastName = ''
      if (fullName.split(' ').length > 1) {
        firstName = fullName.substring(0, fullName.indexOf(' '))
        lastName = fullName.substring(fullName.indexOf(' ') + 1)
      }

      dispatch(setProfile(addAccountName(session.profile, firstName, lastName)))
      navigate('/declaration')
    }
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <Link
              onClick={() => navigate('/signup/contactpreferences')}
              className='govuk-back-link'
            >
              Back
            </Link>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l govuk-!-margin-top-6'>
              Enter your name
            </h1>
            <p className='govuk-body'>
              We'll use this if we need to contact you about your account.
            </p>
            <Input
              inputType='text'
              value={fullName}
              name='Full name'
              onChange={(val) => setFullName(val)}
              error={error}
              className='govuk-input govuk-input--width-20'
            />
            <Button
              text='Continue'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
