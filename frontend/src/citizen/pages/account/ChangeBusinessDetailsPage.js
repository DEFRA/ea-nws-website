import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { getAdditionals, updateAdditionals } from '../../../common/services/ProfileServices'
import { businessDetailsValidation } from '../../../common/services/validations/BusinessDetailsValidation'

export default function ChangeBusinessDetailsPage () {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)
  const profile = JSON.parse(JSON.stringify(session.profile))
  const [businessNameError, setBusinessNameError] = useState('')
  const [jobTitleError, setJobTitleError] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const authToken = session.authToken
  const [businessName, setBusinessName] = useState(getAdditionals(profile, 'businessName'))
  const [jobTitle, setJobTitle] = useState(getAdditionals(profile, 'jobTitle'))

  const handleSubmit = async (event) => {
    const { validationErrorBusiness, validationErrorJob } = businessDetailsValidation(businessName, jobTitle)
    setBusinessNameError(validationErrorBusiness)
    setJobTitleError(validationErrorJob)
    updateAdditionals(profile, 'businessName', businessName)
    updateAdditionals(profile, 'jobTitle', jobTitle)

    const dataToSend = { profile, authToken }
    if (!validationErrorBusiness && !validationErrorJob) {
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

  return (
    <>
      <Link to='/account' className='govuk-back-link govuk-!-margin-bottom-0 govuk-!-margin-top-0'>
        Back
      </Link>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(businessNameError || jobTitleError || error) && (
              <ErrorSummary
                errorList={[businessNameError, jobTitleError, error]}
              />
            )}
            <h2 className='govuk-heading-l'>
              Additional details for business registrations
            </h2>
            <div className='govuk-body'>
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
    </>
  )
}
