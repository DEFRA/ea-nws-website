import React, { useEffect, useState } from 'react'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { postCodeValidation } from '../../../common/services/validations/PostCodeValidation'

export default function AddOrganisationAddressLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const [postCode, setPostCode] = useState('')
  const [buildingNum, setBuildingNum] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [postCode])

  const handleSubmit = async () => {
    const validationError = postCodeValidation(postCode)

    if (!validationError) {
      // DO something
      NavigateToNextPage()
    } else {
      setError(validationError)
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
            <h1 className='govuk-heading-l'>
              Your organisation's UK head office address
            </h1>
            <div className='govuk-body'>
              <Input
                inputType='text'
                value={postCode}
                name='Organisation postcode'
                onChange={(val) => setPostCode(val)}
                error={error}
                className='govuk-input govuk-input--width-20'
                defaultValue={postCode}
              />
              <Input
                inputType='text'
                value={buildingNum}
                name='Building name or number (optional)'
                onChange={(val) => setBuildingNum(val)}
                className='govuk-input govuk-input--width-20'
                defaultValue={buildingNum}
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
