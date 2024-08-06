import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../redux/userSlice'
import { addAccountName } from '../../services/ProfileServices'
import { fullNameValidation } from '../../services/validations/FullNameValidation'

export default function AddAccountNameLayout ({
  NavigateToNextPage,
  NavigateToPreviousPage,
  buttonText,
  changeName,
  updateProfile,
  profileError
}) {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const session = useSelector((state) => state.session)
  const authToken = session.authToken
  const [fullName, setFullName] = useState(
    session.profile
      ? session.profile?.firstname + ' ' + session.profile?.lastname
      : ''
  )

  const handleSubmit = async () => {
    const validationError = fullNameValidation(fullName, 'fullName')
    setError(validationError)

    if (validationError === '') {
      // Split the full name into first name and last name assuming they are separeted by a space.
      // if the string cannot be split then only the first name is set and the last name remains blank
      let firstname = fullName
      let lastname = ''
      if (fullName.split(' ').length > 1) {
        firstname = fullName.substring(0, fullName.indexOf(' '))
        lastname = fullName.substring(fullName.indexOf(' ') + 1)
      }
      const profile = addAccountName(session.profile, firstname, lastname)
      dispatch(setProfile(profile))

      if (changeName) {
        updateProfile(profile, authToken)
        setError(profileError)
      } else {
        NavigateToNextPage()
      }
    }
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <Link
            onClick={navigateBack}
            className='govuk-back-link govuk-!-margin-bottom-0 govuk-!-margin-top-0'
          >
            Back
          </Link>
          <main className='govuk-main-wrapper govuk-!-padding-top-4'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                {error && <ErrorSummary errorList={[error]} />}
                <h2 className='govuk-heading-l'>
                  {changeName ? 'Change your name' : 'Enter your name'}
                </h2>
                <div className='govuk-body'>
                  <p className='govuk-body govuk-!-margin-bottom-5'>
                    We'll use this name if we need to contact you about your
                    account.
                  </p>
                  <Input
                    inputType='text'
                    value={fullName}
                    name='Full name'
                    onChange={(val) => setFullName(val)}
                    error={error}
                    className='govuk-input govuk-input--width-20'
                    defaultValue={fullName}
                  />
                  <Button
                    text={buttonText}
                    className='govuk-button'
                    onClick={handleSubmit}
                  />
                  {changeName && (
                    <Link
                      onClick={navigateBack}
                      className='govuk-body govuk-link inline-link'
                    >
                      Cancel
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}
