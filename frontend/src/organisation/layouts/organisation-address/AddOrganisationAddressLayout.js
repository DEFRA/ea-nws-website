import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import {
  setLocationPostCode,
  setLocationSearchResults
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { postCodeValidation } from '../../../common/services/validations/PostCodeValidation'

export default function AddOrganisationAddressLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [postCode, setPostCode] = useState('')
  const [buildingNum, setBuildingNum] = useState('')
  const [error, setError] = useState('')

  // Clear error when user makes correction
  useEffect(() => {
    setError('')
  }, [postCode])

  const handleSubmit = async () => {
    const validationError = postCodeValidation(postCode)

    if (!validationError) {
      // Search postcode locations and store results in session
      // normalise postcode
      const dataToSend = {
        postCode: postCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
      }
      console.log('Normalised postcode')
      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/os-api/postcode-search',
        navigate
      )
      if (!errorMessage) {
        dispatch(setLocationPostCode(data[0].postcode))
        dispatch(setLocationSearchResults(data))
        NavigateToNextPage()
      } else {
        // show error message from OS Api postcode search
        setError(errorMessage)
      }
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
