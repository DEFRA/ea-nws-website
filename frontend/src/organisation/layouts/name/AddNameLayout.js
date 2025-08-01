import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import {
  setOrganizationName,
  setSigninType
} from '../../../common/redux/userSlice'
// import { backendCall } from '../../../common/services/BackendService'
import { orgNameValidation } from '../../../common/services/validations/OrgNameValidation'

export default function AddNameLayout({
  navigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const orgNameId = 'organisation-name'

  useEffect(() => {
    dispatch(setSigninType('org'))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationError = orgNameValidation(name)

    if (!validationError) {
      dispatch(setOrganizationName(name))
    } else {
      setError(validationError)
      return
    }

    navigateToNextPage()

    /* // Check for duplicate organisation name
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
      navigateToNextPage()
    } */
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
            {error && (
              <ErrorSummary
                errorList={[{ text: error, componentId: orgNameId }]}
              />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              Your organisation's name
            </h1>
            <div className='govuk-body'>
              <Input
                id={orgNameId}
                inputType='text'
                value={name}
                name="Your organisation's name"
                onChange={(val) => setName(val)}
                error={error}
                className='govuk-input govuk-input--width-20'
                defaultValue={name}
                hideLabel={true}
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
