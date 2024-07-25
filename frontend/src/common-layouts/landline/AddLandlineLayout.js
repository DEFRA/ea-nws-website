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

export default function AddLandlineLayout({
  NavigateToNextPage,
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
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/add_contact/landline/add',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        dispatch(
          setProfile(
            addUnverifiedContact(
              session.profile,
              'homePhones',
              normalisedPhoneNumber
            )
          )
        )
        NavigateToNextPage()
      }
    }
  }

  // if user is going back through the signup flow - we want to remove the landline
  // from either the verified or unverified list - we need to do both incase
  // they progressed past the validate landline path
  const HandleBackLink = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div class='govuk-width-container body-container'>
          <Link onClick={HandleBackLink} className='govuk-back-link'>
            Back
          </Link>
          <main className='govuk-main-wrapper'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                {error && <ErrorSummary errorList={[error]} />}
                <h2 class='govuk-heading-l'>
                  Enter a telephone number to get flood messages by phone call
                </h2>
                <div class='govuk-body'>
                  <p>
                    We recommend using a landline or mobile number that can be
                    called 24 hours a day.
                  </p>
                  <Input
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
        </div>
        <Footer />
      </div>
    </>
  )
}
