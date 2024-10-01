import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../../../common/components/gov-uk/Input'
import {
  setCurrentLocationFullAddress,
  setCurrentLocationPostcode
} from '../../../../../../common/redux/userSlice'
import { postCodeValidation } from '../../../../../../common/services/validations/PostCodeValidation'

export default function AddOptionalAddress() {
  const navigate = useNavigate()
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [town, setTown] = useState('')
  const [county, setCounty] = useState('')
  const [postcode, setPostcode] = useState('')
  const [postcodeError, setPostcodeError] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setPostcodeError('')
  }, [postcode])
  const navigateToNextPage = () => {
    navigate('/')
  }

  // only postcode validated because its an optional field the user is adding for their own benifit - UCD team

  const handleSubmit = (event) => {
    event.preventDefault()
    const fullAddressArray = [addressLine1, addressLine2, town, county]

    let fullAddressStr = null

    fullAddressArray.forEach((entry) => {
      if (entry !== null) {
        fullAddressStr = fullAddressStr + entry
      }
    })
    fullAddressStr = fullAddressStr.slice(0, -2)

    if (postcode !== '') {
      const postcodeValidationError = postCodeValidation(postcode)
      if (postcodeValidationError !== '') {
        setPostcodeError(postcodeValidationError)
      } else {
        dispatch(setCurrentLocationFullAddress(fullAddressStr))
        dispatch(setCurrentLocationPostcode(postcode))

        navigateToNextPage()
      }
    } else {
      dispatch(setCurrentLocationFullAddress(fullAddressStr))
      dispatch(setCurrentLocationPostcode(postcode))
      navigateToNextPage()
    }
  }
  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {postcodeError && <ErrorSummary errorList={[postcodeError]} />}
            <h1 className='govuk-heading-l'>What is the address?</h1>
            <Input
              inputType='text'
              name='Address line 1 (optional)'
              onChange={(val) => setAddressLine1(val)}
              className='govuk-input govuk-input--width-30'
              isNameBold
            />

            <Input
              inputType='text'
              name='Address line 2 (optional)'
              onChange={(val) => setAddressLine2(val)}
              className='govuk-input govuk-input--width-30'
              isNameBold
            />

            <Input
              inputType='text'
              name='Town or city (optional)'
              onChange={(val) => setTown(val)}
              className='govuk-input govuk-input--width-20'
              isNameBold
            />

            <Input
              inputType='text'
              name='County (optional)'
              onChange={(val) => setCounty(val)}
              className='govuk-input govuk-input--width-20'
              isNameBold
            />

            <Input
              inputType='text'
              name='Postcode (optional)'
              error={postcodeError}
              onChange={(val) => setPostcode(val)}
              className='govuk-input govuk-input--width-10'
              isNameBold
            />

            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
