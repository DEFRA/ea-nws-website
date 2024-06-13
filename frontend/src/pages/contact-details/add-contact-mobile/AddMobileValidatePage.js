import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ErrorSummary from '../../../gov-uk-components/ErrorSummary'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Input from '../../../gov-uk-components/Input'
import InsetText from '../../../gov-uk-components/InsetText'
import { setProfile } from '../../../redux/userSlice'
import { backendCall } from '../../../services/BackendService'
import {
  addUnverifiedContact,
  removeUnverifiedContact,
  removeVerifiedContact
} from '../../../services/ProfileServices'
import { authCodeValidation } from '../../../services/validations/AuthCodeValidation'
export default function AddMobileValidatePage() {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('')

  const session = useSelector((state) => state.session)
  const mobile = session.profile.unverified.mobilePhones[0]
    ? session.profile.unverified.mobilePhones[0]
    : session.profile.mobilePhones[0]

  const authToken = useSelector((state) => state.session.authToken)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = authCodeValidation(code)
    setError(validationError)
    if (validationError === '') {
      const dataToSend = { authToken: authToken, code, msisdn: mobile }
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/add_contact/mobile/validate',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage.desc)
      } else {
        dispatch(setProfile(data.profile))
        navigate('/managecontacts')
      }
    }
  }

  const getNewCode = async (event) => {
    event.preventDefault()
    const data = { authToken: authToken, msisdn: mobile }
    const { errorMessage } = await backendCall(
      data,
      'api/add_contact/mobile/add',
      navigate
    )
    console.log(errorMessage)
    if (errorMessage !== null) {
      setError(errorMessage.desc)
    }
  }

  const skipValidation = (event) => {
    event.preventDefault()
    // remove email from verified list if user is going back after validating
    const updatedProfile = removeVerifiedContact(session.profile, mobile)
    // we will need to add the email back to the unverified list - if it already exists
    // nothing will happen and it will remain
    dispatch(setProfile(addUnverifiedContact(updatedProfile, 'mobile', mobile)))
    navigate('/managecontacts', {
      state: {
        unconfirmedtype: location.state.type,
        unconfirmedvalue: location.state.contact
      }
    })
  }

  const differentMobile = (event) => {
    event.preventDefault()
    // remove email from users profile
    dispatch(setProfile(removeUnverifiedContact(session.profile, mobile)))
    navigate('/managecontacts/add-mobile')
  }

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <Link to="/managecontacts/add-mobile" className="govuk-back-link">
          Back
        </Link>
        <ErrorSummary errorList={error === '' ? [] : [error]} />
        <h2 class="govuk-heading-l">Check your mobile phone</h2>
        <div class="govuk-body">
          We've sent a text with a code to:
          <InsetText text={mobile} />
          Use the code within 4 hours or it will expire.
          <br /> <br />
          <Input
            name="Enter code"
            inputType="text"
            error={error}
            onChange={(val) => setCode(val)}
          />
          <Button
            className="govuk-button"
            text="Continue"
            onClick={handleSubmit}
          />
          <Link
            onClick={skipValidation}
            className="govuk-link"
            style={{
              display: 'inline-block',
              padding: '8px 10px 7px'
            }}
          >
            Skip and confirm later
          </Link>
          <br />
          <Link onClick={getNewCode} className="govuk-link">
            Get a new code
          </Link>
          <br /> <br />
          <Link onClick={differentMobile} className="govuk-link">
            Enter a different mobile
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
