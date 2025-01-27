import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import {
  setLocationPostCode,
  setLocationSearchResults,
  setOrganizationAddress,
  setOrganizationPostalCode
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { postCodeValidation } from '../../../common/services/validations/PostCodeValidation'

export default function AddAddressLayout ({
  navigateToNextPage,
  NavigateToPreviousPage
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [postCode, setPostCode] = useState('')
  const [buildingNum, setBuildingNum] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    const validationError = postCodeValidation(postCode)

    if (!validationError) {
      const dataToSend = {
        postCode: postCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
      }
      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/os-api/postcode-search',
        navigate
      )
      if (!errorMessage) {
        dispatch(setLocationPostCode(data[0].postcode))
        dispatch(setOrganizationPostalCode(data[0].postcode))

        if (buildingNum) {
          const normalisedBuildingNum = buildingNum.toLowerCase().trim()
          const address = data.filter((location) =>
            location.address
              .toLowerCase()
              .trim()
              .includes(normalisedBuildingNum)
          )
          if (address.length === 1) {
            dispatch(setOrganizationAddress(address[0].address))
            navigate('/organisation/sign-up/address-confirm')
            return // Ensure none of the following code is executed
          } else {
            // Multiple addresses with buildingNum returned, take them to pagination to confirm
            dispatch(setLocationSearchResults(address))
          }
        } else {
          dispatch(setLocationSearchResults(data))
        }
        navigateToNextPage()
      } else {
        setError(errorMessage)
      }
    } else {
      setError(validationError)
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
            <h1 className='govuk-heading-l'>
              Your organisation's UK head office address
            </h1>
            <div className='govuk-body'>
              <Input
                inputType='text'
                value={postCode}
                name='Postcode'
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
