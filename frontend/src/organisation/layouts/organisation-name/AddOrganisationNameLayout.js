import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setOrgName } from '../../../common/redux/userSlice'
import { orgNameValidation } from '../../../common/services/validations/OrgNameValidation'

export default function AddOrganisationNameLayout({
  NavigateToNextPage,
  NavigateToPreviousPage,
  buttonText
}) {
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const session = useSelector((state) => state.session)
  const [name, setName] = useState('')

  const handleSubmit = async () => {
    const validationError = orgNameValidation(name, 'orgName')
    setError(validationError)

    if (validationError === '') {
      dispatch(setOrgName(name))
      NavigateToNextPage()
    }
  }

  const navigateBack = async (event) => {
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
            <h2 className='govuk-heading-l'>Your organisation's name</h2>
            <div className='govuk-body'>
              <Input
                inputType='text'
                value={name}
                name='Organisation name'
                onChange={(val) => setName(val)}
                error={error}
                className='govuk-input govuk-input--width-20'
                defaultValue={name}
              />
              <Button
                text={buttonText}
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
