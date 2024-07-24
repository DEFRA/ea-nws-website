import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import { addUnverifiedContact } from '../../services/ProfileServices'
import { normalisePhoneNumber } from '../../services/formatters/NormalisePhoneNumber'
import { phoneValidation } from '../../services/validations/PhoneValidation'

export default function AddMobileLayout({
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
          setProfile(addUnverifiedContact(session.profile, 'mobile', mobile))
        )
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
      <div className='page-container'>
        <Header />
        <div class='govuk-width-container body-container'>
          <Link onClick={handleBackLink} className='govuk-back-link'>
            Back
          </Link>
          <main className='govuk-main-wrapper'>
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
        </div>
        <Footer />
      </div>
    </>
  )
}
