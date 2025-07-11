import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import {
  setEnterAddressManuallyFlow,
  setOrganizationAddress
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { postCodeValidation } from '../../../common/services/validations/PostCodeValidation'

export default function EnterAddressManuallyLayout({
  navigateToConfirmPage,
  navigateToSearchResultsPage,
  navigateToAddAddressPage
}) {
  const navigate = useNavigate()
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
  let noErrors = Object.values(errors).every((value) => value === '')
  const locations = useSelector((state) => state.session.locationSearchResults)
  const previousOrgAddress = useSelector(
    (state) => state.session.previousOrgAddress
  )

  // reset enter address manually flow
  useEffect(() => {
    dispatch(setEnterAddressManuallyFlow(null))
  }, [])

  const validateFields = () => {
    const newErrors = {
      addressLine1Error: '',
      townOrCityError: '',
      postcodeError: ''
    }

    if (!addressLine1) {
      newErrors.addressLine1Error = 'Enter address line 1'
    }
    if (!townOrCity) {
      newErrors.townOrCityError = 'Enter a town or city'
    }
    if (!postcode) {
      newErrors.postcodeError = 'Enter a postcode'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((value) => value === '')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const isValid = validateFields()
    if (isValid) {
      const postCodeValidationError = postCodeValidation(postcode, false)

      if (!postCodeValidationError) {
        // validate postcode is in UK
        const dataToSend = {
          englandOnly: false,
          postCode: postcode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
        }
        const { data, errorMessage } = await backendCall(
          dataToSend,
          'api/os-api/postcode-search',
          navigate
        )

        // no results returned
        if (errorMessage) {
          setErrors((prev) => ({
            ...prev,
            postcodeError: 'Enter a postcode in the UK'
          }))
          return
        }

        const orgAddress = [
          addressLine1,
          addressLine2,
          townOrCity,
          county,
          postcode.toUpperCase()
        ]
          .filter((part) => part.trim() !== '')
          .join(', ')

        dispatch(setOrganizationAddress(orgAddress))
        dispatch(setEnterAddressManuallyFlow(true))
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
    if (previousOrgAddress) {
      navigateToConfirmPage()
    } else if (locations) {
      navigateToSearchResultsPage()
    } else {
      navigateToAddAddressPage()
    }
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {!noErrors && <ErrorSummary errorList={Object.values(errors)} />}
            <h1 className='govuk-heading-l' id='main-content'>
              What's your organisation's UK head office address?
            </h1>
            <div className='govuk-body'>
              <Input
                id='address-line-1'
                inputType='text'
                value={addressLine1}
                name='Address line 1'
                onChange={(val) => {
                  setAddressLine1(val)
                  setErrors((prev) => ({
                    ...prev,
                    addressLine1Error: ''
                  }))
                }}
                error={errors.addressLine1Error}
                className='govuk-input govuk-!-width-two-thirds'
                isNameBold={true}
                labelSize='s'
              />
              <Input
                id='address-line-2'
                inputType='text'
                value={addressLine2}
                name='Address line 2 (optional)'
                onChange={(val) => setAddressLine2(val)}
                className='govuk-input govuk-!-width-two-thirds'
                isNameBold={true}
                labelSize='s'
              />
              <Input
                id='town-or-city'
                inputType='text'
                value={townOrCity}
                name='Town or city'
                error={errors.townOrCityError}
                onChange={(val) => {
                  setTownOrCity(val)
                  setErrors((prev) => ({
                    ...prev,
                    townOrCityError: ''
                  }))
                }}
                className='govuk-input govuk-!-width-one-half'
                isNameBold={true}
                labelSize='s'
              />
              <Input
                id='county'
                inputType='text'
                value={county}
                name='County (optional)'
                onChange={(val) => setCounty(val)}
                className='govuk-input govuk-!-width-one-half'
                isNameBold={true}
                labelSize='s'
              />
              <Input
                id='postcode'
                inputType='text'
                value={postcode}
                name='Postcode'
                error={errors.postcodeError}
                onChange={(val) => {
                  setPostcode(val)
                  setErrors((prev) => ({
                    ...prev,
                    postcodeError: ''
                  }))
                }}
                className='govuk-input govuk-!-width-one-third'
                isNameBold={true}
                labelSize='s'
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
