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

export default function AddMobileLayout ({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)
  const authToken = useSelector((state) => state.session.authToken)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = phoneValidation(mobile, 'mobile')
    setError(validationError)
    if (validationError === '') {
      const normalisedPhoneNumber = normalisePhoneNumber(mobile)
      const dataToSend = { msisdn: normalisedPhoneNumber, authToken }
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/add_contact/mobile/add',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        dispatch(
          setProfile(
            addUnverifiedContact(
              session.profile,
              'mobile',
              normalisedPhoneNumber
            )
          )
        )
        dispatch(setCurrentContact(normalisedPhoneNumber))
        NavigateToNextPage()
      }
    }
  }

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
            <h2 class='govuk-heading-l'>
              Enter a mobile number to get flood messages by text
            </h2>
            <div class='govuk-body'>
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
