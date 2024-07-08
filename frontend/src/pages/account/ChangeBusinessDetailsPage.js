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
import { businessDetailsValidation } from '../../services/validations/BusinessDetailsValidation'

export default function ChangeBusinessDetailsPage () {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const profile = JSON.parse(JSON.stringify(session.profile))
  const [businessNameError, setBusinessNameError] = useState('')
  const [jobTitleError, setJobTitleError] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const authToken = session.authToken

  const updateAdditionals = (profile, id, value) => {
    let idFound = false
    for (let i = 0; i < profile.additionals.length; i++) {
      if (profile.additionals[i].id === id) {
        profile.additionals[i].value = value
        idFound = true
      }
    }
    if (!idFound) {
      profile.additionals.push({ id, value })
    }
  }

  const getAdditionals = (profile, id) => {
    for (let i = 0; i < profile.additionals.length; i++) {
      if (profile.additionals[i].id === id) {
        return profile.additionals[i].value
      }
    }
    return ''
  }

  const [businessName, setBusinessName] = useState(getAdditionals(profile, 'businessName'))
  const [jobTitle, setJobTitle] = useState(getAdditionals(profile, 'jobTitle'))

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { validationErrorBusiness, validationErrorJob } = businessDetailsValidation(businessName, jobTitle)
    setBusinessNameError(validationErrorBusiness)
    setJobTitleError(validationErrorJob)
    updateAdditionals(profile, 'businessName', businessName)
    updateAdditionals(profile, 'jobTitle', jobTitle)

    const dataToSend = { profile, authToken }
    if (validationErrorBusiness === '' && validationErrorJob === '') {
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
            changeBusinessDetails: true,
            businessName: getAdditionals(profile, 'businessName'),
            jobTitle: getAdditionals(profile, 'jobTitle')
          }
        })
      }
    }
  }

  const possibleErrors = [businessNameError, jobTitleError, error]
  const errorList = []
  for (let i = 0; i < possibleErrors.length; i++) {
    (possibleErrors[i] !== '') && errorList.push(possibleErrors[i])
  }

  return (
    <>
      <Header />
      <div class='govuk-width-container'>
        <PhaseBanner />
        <Link onClick={() => navigate(-1)} className='govuk-back-link'>
          Back
        </Link>
        <main className='govuk-main-wrapper'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              {errorList.length > 0 && (<ErrorSummary errorList={errorList} />)}
              <h2 class='govuk-heading-l'>
                Additional details for business registrations
              </h2>
              <div class='govuk-body'>
                <Input
                  name='Business name (optional)'
                  inputType='text'
                  error={businessNameError}
                  onChange={(val) => setBusinessName(val)}
                  className='govuk-input'
                  defaultValue={getAdditionals(profile, 'businessName')}
                />
                <Input
                  name='Job title (optional)'
                  inputType='text'
                  error={jobTitleError}
                  onChange={(val) => setJobTitle(val)}
                  className='govuk-input'
                  defaultValue={getAdditionals(profile, 'jobTitle')}
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
