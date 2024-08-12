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
  setOrgAddress
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { postCodeValidation } from '../../../common/services/validations/PostCodeValidation'

export default function AddAddressLayout({
  NavigateToNextPage,
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
      // Normalise postcode, then search locations and store results in session
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

        // if buildingNum provided (and exactly one address is found) then navigate straight to confirmation
        if (buildingNum) {
          const address = data.filter((location) =>
            location.name.toLowerCase().includes(buildingNum.toLowerCase())
          )
          if (address.length === 1) {
            dispatch(setOrgAddress(address[0]))
            navigate('/organisation/register/address-confirm')
            return // Ensure none of the following code is executed
          }
          // Multiple addresses with buildingNum returned, take them to pagination to confirm
          else {
            dispatch(setLocationSearchResults(address))
          }
        } else {
          // otherwise, send all results to pagination page where user will confirm
          dispatch(setLocationSearchResults(data))
        }
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
