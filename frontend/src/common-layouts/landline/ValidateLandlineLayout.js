import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import InsetText from '../../gov-uk-components/InsetText'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import {
  addUnverifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../services/ProfileServices'
import { authCodeValidation } from '../../services/validations/AuthCodeValidation'

export default function ValidateLandlineLayout({
  NavigateToNextPage,
  SkipValidation,
  DifferentHomePhone,
  NavigateToPreviousPage
}) {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const session = useSelector((state) => state.session)

  const indexLastUnverifiedHomePhone =
    session.profile.unverified.homePhones.length - 1
  const indexLastHomePhone = session.profile.homePhones.length - 1

  const homePhone = session.profile.unverified.homePhones[
    indexLastUnverifiedHomePhone
  ]
    ? session.profile.unverified.homePhones[indexLastUnverifiedHomePhone]
    : session.profile.homePhones[indexLastHomePhone]
  const authToken = session.authToken

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { authToken, msisdn: homePhone, code }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/add_contact/landline/validate',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        dispatch(setProfile(data.profile))
        NavigateToNextPage()
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { authToken, msisdn: homePhone }
    const { errorMessage } = await backendCall(
      data,
      'api/add_contact/landline/add',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage)
    }
  }

  const skipValidation = (event) => {
    event.preventDefault()
    // remove homephone from verified list if user is going back after validating
    const updatedProfile = removeVerifiedContact(session.profile, homePhone)
    // we will need to add the homephone back to the unverified list - if it already exists
    // nothing will happen and it will remain
    dispatch(
      setProfile(addUnverifiedContact(updatedProfile, 'homePhones', homePhone))
    )
    SkipValidation(homePhone)
  }

  const differentHomePhone = async (event) => {
    event.preventDefault()
    removeLandlineFromProfile()
    DifferentHomePhone(homePhone)
  }

  const backLink = async (event) => {
    event.preventDefault()
    removeLandlineFromProfile()
    NavigateToPreviousPage()
  }

  const removeLandlineFromProfile = async () => {
    let updatedProfile
    if (session.profile.unverified.homePhones.includes(homePhone)) {
      updatedProfile = removeUnverifiedContact(session.profile, homePhone)
      dispatch(setProfile(removeUnverifiedContact(session.profile, homePhone)))
    }
    if (session.profile.homePhones.includes(homePhone)) {
      updatedProfile = removeVerifiedContact(session.profile, homePhone)
      dispatch(setProfile(removeVerifiedContact(session.profile, homePhone)))
    }
    const dataToSend = { profile: updatedProfile, authToken: session.authToken }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage)
      return
    }
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div class='govuk-width-container body-container'>
          <Link
            onClick={backLink}
            className='govuk-back-link govuk-!-margin-bottom-0 govuk-!-margin-top-0'
          >
            Back
          </Link>
          <main className='govuk-main-wrapper'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                {error ? <ErrorSummary errorList={[error]} /> : <></>}
                <h2 class='govuk-heading-l'>Confirm telephone number</h2>
                <div class='govuk-body'>
                  We're calling this number to read out a code:
                  <InsetText text={homePhone} />
                  Use the code within 4 hours or it will expire.
                  <br /> <br />
                  <Input
                    name='Enter code'
                    inputType='text'
                    error={error}
                    onChange={(val) => setCode(val)}
                  />
                  <Button
                    className='govuk-button'
                    text='Continue'
                    onClick={handleSubmit}
                  />
                  <Link
                    onClick={skipValidation}
                    className='govuk-link'
                    style={{
                      display: 'inline-block',
                      padding: '8px 10px 7px'
                    }}
                  >
                    Skip and confirm later
                  </Link>
                  <br />
                  <Link onClick={getNewCode} className='govuk-link'>
                    Get a new code
                  </Link>
                  <br /> <br />
                  <Link onClick={differentHomePhone} className='govuk-link'>
                    Enter a different telephone number
                  </Link>
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
