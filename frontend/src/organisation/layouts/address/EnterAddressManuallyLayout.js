import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import { setOrganizationAddress } from '../../../common/redux/userSlice'
import { postCodeValidation } from '../../../common/services/validations/PostCodeValidation'

export default function AddAddressLayout({
  navigateToNextPage,
  navigateToPreviousPage,
  navigateToConfirmPage
}) {
  const dispatch = useDispatch()
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [townOrCity, setTownOrCity] = useState('')
  const [county, setCounty] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState({
    addressLine1Error: '',
    townOrCityError: '',
    postcodeError: ''
  })

  const validateFields = () => {
    if (!addressLine1) {
      setErrors((prev) => ({
        ...prev,
        addressLine1Error: 'Enter address line 1'
      }))
    }
    if (!townOrCity) {
      setErrors((prev) => ({
        ...prev,
        addressLine1Error: 'Enter a town or city'
      }))
    }
    if (!postcode) {
      setErrors((prev) => ({
        ...prev,
        postcodeError: 'Enter a postcode'
      }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    validateFields()
    const noErrors = Object.values(errors).every((value) => value === '')

    if (noErrors) {
      // this needs updated - reminder to look at figma requirements
      const postCodeValidationError = postCodeValidation(postCode)

      if (!postCodeValidationError) {
        // this needs updated aswell - do we include everything just comma seperated?
        dispatch(setOrganizationAddress())
        navigateToConfirmPage()
      } else {
        setErrors((prev) => ({
          ...prev,
          postcodeError: postCodeValidationError
        }))
      }
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {errors && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l' id='main-content'>
              What's your organisation's UK head office address?
            </h1>
            <div className='govuk-body'>
              <Input
                id='address-line-1'
                inputType='text'
                value={addressLine1}
                name='Address line 1'
                onChange={(val) => setAddressLine1(val)}
                error={errors.addressLine1Error}
                className='govuk-input govuk-input--width-20'
              />
              <Input
                id='address-line-2'
                inputType='text'
                value={addressLine2}
                name='Address line 2 (optional)'
                onChange={(val) => setAddressLine2(val)}
                className='govuk-input govuk-input--width-20'
              />
              <Input
                id='town-or-city'
                inputType='text'
                value={townOrCity}
                name='Town or city'
                error={errors.townOrCityError}
                onChange={(val) => setTownOrCity(val)}
                className='govuk-input govuk-input--width-20'
              />
              <Input
                id='county'
                inputType='text'
                value={county}
                name='County (optional)'
                onChange={(val) => setCounty(val)}
                className='govuk-input govuk-input--width-20'
              />
              <Input
                id='postcode'
                inputType='text'
                value={postcode}
                name='Postcode'
                error={errors.postcodeError}
                onChange={(val) => setPostcode(val)}
                className='govuk-input govuk-input--width-20'
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
              <br />
              <Link to={'/home'}>Enter address manually</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
