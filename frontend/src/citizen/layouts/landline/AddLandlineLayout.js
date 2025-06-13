import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setCurrentContact, setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { addUnverifiedContact } from '../../../common/services/ProfileServices'
import { normalisePhoneNumber } from '../../../common/services/formatters/NormalisePhoneNumber'
import { phoneValidation } from '../../../common/services/validations/PhoneValidation'

export default function AddLandlineLayout({
  navigateToNextPage,
  NavigateToPreviousPage
}) {
  const navigate = useNavigate()
  const [landline, setLandline] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
  const authToken = useSelector((state) => state.session.authToken)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = phoneValidation(landline, 'mobileAndLandline')
    setError(validationError)
    if (validationError === '') {
      const normalisedPhoneNumber = normalisePhoneNumber(landline)
      const dataToSend = { msisdn: normalisedPhoneNumber, authToken }
      const profile = addUnverifiedContact(
        session.profile,
        'homePhones',
        normalisedPhoneNumber
      )
      const profileDataToSend = { profile, authToken }
      const { errorMessage, data } = await backendCall(
        profileDataToSend,
        'api/profile/update',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        dispatch(setProfile(data.profile))
        const { errorMessage } = await backendCall(
          dataToSend,
          'api/add_contact/landline/add',
          navigate
        )
        if (errorMessage !== null) {
          setError(errorMessage)
        } else {
          dispatch(setCurrentContact(normalisedPhoneNumber))
          navigateToNextPage()
        }
      }
    }
  }

  // if user is going back through the signup flow - we want to remove the landline
  // from either the verified or unverified list - we need to do both incase
  // they progressed past the validate landline path
  const handleBackLink = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={handleBackLink} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h2 className='govuk-heading-l' id='main-content'>
              Enter a telephone number to get flood messages by phone call
            </h2>
            <div className='govuk-body'>
              <p>
                We recommend using a landline or mobile number that can be
                called 24 hours a day.
              </p>
              <Input
                id='uk-landline-mobile'
                name='UK landline or mobile telephone number'
                inputType='text'
                error={error}
                onChange={(val) => setLandline(val)}
                className='govuk-input govuk-input--width-20'
              />
              <Button
                className='govuk-button'
                text='Continue'
                onClick={handleSubmit}
              />
              <br />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
