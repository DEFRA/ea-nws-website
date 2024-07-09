import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import '../../custom.css'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import { fullNameValidation } from '../../services/validations/FullNameValidation'

export default function ChangeNamePage () {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const profile = JSON.parse(JSON.stringify(session.profile))
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const authToken = session.authToken
  const [fullName, setFullName] = useState(profile?.firstname+' '+profile?.lastname)

  const setName = (profile, fullName) => {
    let firstName = fullName
    let lastName = ''
    if (fullName.split(' ').length > 1){
      firstName = fullName.substring(0, fullName.indexOf(' '))
      lastName = fullName.substring(fullName.indexOf(' ') + 1)
    }

    profile.firstname = firstName
    profile.lastname = lastName
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = fullNameValidation(fullName)
    setName(profile, fullName)

    const dataToSend = { profile, authToken }
    if (validationError === '') {
      const { errorMessage, data } = await backendCall(
        dataToSend,
        'api/profile/update',
        navigate
      )
      if (errorMessage !== null) {
        setError(errorMessage)
      } else {
        dispatch(
          setProfile(data.profile)
        )
        navigate('/account', {
          state: {
            changeName: true,
            name: profile?.firstname+' '+profile?.lastname
          }
        })
      }
    } else {
      setError(validationError)
    }
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <Link to='/account' className='govuk-back-link govuk-!-margin-bottom-0 govuk-!-margin-top-0'>
          Back
        </Link>
        <main className='govuk-main-wrapper govuk-!-padding-top-4'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-full'>
              {error && <ErrorSummary errorList={[error]} />}
              <h2 className='govuk-heading-l'>
                Change your name
              </h2>
              <div className='govuk-body'>
                <p className='govuk-body govuk-!-margin-bottom-5'>
                  We'll use this name if we need to contact you about your account.
                </p>
                <Input
                  className='govuk-input govuk-!-width-one-half'
                  inputType='text'
                  name='Full name'
                  error={error}
                  onChange={(val) => setFullName(val)}
                  defaultValue={fullName}
                />
                <Button
                  className='govuk-button'
                  text='Save changes'
                  onClick={handleSubmit}
                />
                <Link
                  to='/account'
                  className='govuk-body govuk-link inline-link'
                >
                  Cancel
                </Link>
                <br />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
