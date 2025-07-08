import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import {
  setLocationPostCode,
  setLocationSearchResults,
  setOrgBuildingName,
  setOrganizationAddress,
  setOrganizationPostalCode
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { postCodeValidation } from '../../../common/services/validations/PostCodeValidation'

export default function AddAddressLayout({
  navigateToNextPage,
  navigateToPreviousPage,
  navigateToConfirmPage,
  navigateToEnterAddressManuallyPage
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [postCode, setPostCode] = useState('')
  const [buildingNum, setBuildingNum] = useState('')
  const [error, setError] = useState('')
  const postcodeId = 'postcode'

  const handleSubmit = async (event) => {
    event.preventDefault()
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
        console.log('data[0].postcode', data[0].postcode)
        dispatch(setOrganizationPostalCode(data[0].postcode))
        dispatch(setLocationSearchResults(data))

        if (buildingNum) {
          dispatch(setOrgBuildingName(buildingNum))
          const normalisedBuildingNum = buildingNum.toLowerCase().trim()
          const address = data.filter((location) =>
            location.address
              .toLowerCase()
              .trim()
              .includes(normalisedBuildingNum)
          )
          // exact match found
          if (address.length === 1) {
            dispatch(setOrganizationAddress(address[0].address))
            navigateToConfirmPage()
            return
          }
        } else {
          dispatch(setOrgBuildingName(''))
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
    navigateToPreviousPage()
  }

  const navigateToEnterAddressManually = (event) => {
    event.preventDefault()
    dispatch(setLocationSearchResults(null))
    navigateToEnterAddressManuallyPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && (
              <ErrorSummary errorList={[{ text: error, componentId: postcodeId }]} />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              Your organisation's UK head office address
            </h1>
            <div className='govuk-body'>
              <Input
                id={postcodeId}
                inputType='text'
                value={postCode}
                name='Postcode'
                onChange={(val) => setPostCode(val)}
                error={error}
                className='govuk-input govuk-input--width-20'
                isNameBold
                defaultValue={postCode}
              />
              <Input
                id='building-name'
                inputType='text'
                value={buildingNum}
                name='Building name or number (optional)'
                onChange={(val) => setBuildingNum(val)}
                className='govuk-input govuk-input--width-20'
                isNameBold
                defaultValue={buildingNum}
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
              <br />
              <Link onClick={navigateToEnterAddressManually}>
                Enter address manually
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
