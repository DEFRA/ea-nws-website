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
import CitizenAccountNavigation from '../../../common/components/custom/CitizenAccountNavigation'
import { useLocation } from 'react-router-dom'
export default function AddMobileLayout ({
  navigateToNextPage,
  NavigateToPreviousPage
}) {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const sessionProfile = useSelector((state) => state.session.profile)
  const authToken = useSelector((state) => state.session.authToken)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = phoneValidation(mobile, 'mobile')
    setError(validationError)
    if (validationError === '') {
      const normalisedPhoneNumber = normalisePhoneNumber(mobile)
      const dataToSend = { msisdn: normalisedPhoneNumber, authToken }
      const profile = addUnverifiedContact(
        sessionProfile,
        'mobile',
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
          'api/add_contact/mobile/add',
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

  const handleBackLink = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
    <CitizenAccountNavigation currentPage={useLocation().pathname}/>
      <BackLink onClick={handleBackLink} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h2 className='govuk-heading-l'>
              Enter a mobile number to get flood messages by text
            </h2>
            <div className='govuk-body'>
              <p>
                We recommend using a mobile number where we can reach you 24
                hours a day.
              </p>
              <Input
                name='UK mobile telephone number'
                inputType='text'
                error={error}
                onChange={(val) => setMobile(val)}
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
