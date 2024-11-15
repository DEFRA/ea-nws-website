import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  getOrganisationAdditionals,
  setOrganisationAdditionals,
  updateOrganisationAdditionals
} from '../../../common/services/ProfileServices'
import { orgNameValidation } from '../../../common/services/validations/OrgNameValidation'

export default function AddNameLayout ({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const profile = useSelector((state) => state.session.profile)

  const handleSubmit = async () => {
    const validationError = orgNameValidation(name)
    const organisationProfile = setOrganisationAdditionals(profile)
    const organisation = getOrganisationAdditionals(organisationProfile)

    if (!validationError) {
      organisation.name = name

      const updatedProfile = updateOrganisationAdditionals(
        organisationProfile,
        organisation
      )
      dispatch(setProfile(updatedProfile))
    } else {
      setError(validationError)
      return
    }

    // Check for duplicate organisation name
    const dataToSend = { name }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/org/sign_up_start',
      navigate
    )

    if (errorMessage !== null) {
      if (errorMessage === 'organisation already registered') {
        navigate('/organisation/sign-up/duplicate', {
          state: { name }
        })
      } else {
        setError(errorMessage)
      }
    } else {
      NavigateToNextPage()
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>Your organisation's name</h1>
            <div className='govuk-body'>
              <Input
                inputType='text'
                value={name}
                onChange={(val) => setName(val)}
                error={error}
                className='govuk-input govuk-input--width-20'
                defaultValue={name}
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
