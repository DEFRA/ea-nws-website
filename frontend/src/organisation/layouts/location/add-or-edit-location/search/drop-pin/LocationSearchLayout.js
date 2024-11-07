import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../../common/components/custom/OrganisationAccountNavigation'
import Autocomplete from '../../../../../../common/components/gov-uk/Autocomplete'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../../common/components/gov-uk/Radio'
import { setCurrentLocationCoordinates } from '../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../common/services/BackendService'

export default function LocationSearchLayout({ navigateToNextPage }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchOption, setSearchOption] = useState('')
  const [searchOptionError, setSearchOptionError] = useState('')
  const searchOptionErrorText = 'Select how you want to find this location'
  const [placeNameTownOrPostcode, setPlaceNameTownOrPostcode] = useState('')
  const placeNameTownOrPostcodeText = 'Enter a place name, town or postcode'
  const [placeNameTownOrPostcodeCoords, setPlaceNameTownOrPostcodeCoords] =
    useState(null)
  const [placeNameTownOrPostcodeError, setPlaceNameTownOrPostcodeError] =
    useState('')
  const [results, setResults] = useState(null)

  // remove error if user changes search option
  useEffect(() => {
    setSearchOptionError('')
    setPlaceNameTownOrPostcodeError('')
    setPlaceNameTownOrPostcode('')
  }, [searchOption])

  // remove error if user changes place name, town or postcode
  useEffect(() => {
    if (placeNameTownOrPostcodeError) {
      setPlaceNameTownOrPostcodeError('')
    }
  }, [placeNameTownOrPostcode])

  const searchOptions = [
    { label: 'Place name', value: 'PlaceName' },
    { label: 'Town', value: 'Town' },
    { label: 'Postcode', value: 'Postcode' }
  ]

  const handleInputChange = async (value) => {
    setPlaceNameTownOrPostcode(value)
    setResults([])
    const valueEmpty = value.length === 0
    if (searchOption) {
      const valueLongEnough = value.length >= 3
      const valueValid = !valueEmpty && valueLongEnough
      let searchFilter = null
      if (valueValid) {
        switch (searchOption) {
          case searchOptions[0].value:
            // Leave search filter set to null
            break
          case searchOptions[1].value:
            searchFilter = ['City', 'Town', 'Village']
            break
          case searchOptions[2].value:
            searchFilter = ['Postcode']
            break
          default:
            break
        }
        const dataToSend = {
          name: value,
          filter: searchFilter
        }
        const { data, errorMessage } = await backendCall(
          dataToSend,
          'api/os-api/name-search',
          navigate
        )
        if (!errorMessage) {
          setResults(data)
          setPlaceNameTownOrPostcodeError('')
        } else {
          // show error message from OS Api postcode search
          setPlaceNameTownOrPostcodeError(errorMessage)
        }
      }
    } else {
      setSearchOptionError(valueEmpty ? '' : searchOptionErrorText)
    }
  }

  const handleOnClick = (value) => {
    setPlaceNameTownOrPostcode(value.address)
    setPlaceNameTownOrPostcodeCoords(value.coordinates)
  }

  const handleSubmit = () => {
    if (!searchOption) {
      setSearchOptionError(searchOptionErrorText)
    }

    const trimmedPlaceNameTownOrPostcode = placeNameTownOrPostcode.trim()
    if (trimmedPlaceNameTownOrPostcode === '') {
      setPlaceNameTownOrPostcodeError(placeNameTownOrPostcodeText)
    } else if (results && results.length === 0) {
      setPlaceNameTownOrPostcodeError(
        'Place name, town or postcode is not recognised'
      )
    }

    if (
      !searchOptionError &&
      !placeNameTownOrPostcodeError &&
      placeNameTownOrPostcodeCoords
    ) {
      dispatch(setCurrentLocationCoordinates(placeNameTownOrPostcodeCoords))
      navigateToNextPage(placeNameTownOrPostcode)
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-two-thirds'>
            {(searchOptionError || placeNameTownOrPostcodeError) && (
              <ErrorSummary
                errorList={[searchOptionError, placeNameTownOrPostcodeError]}
              />
            )}
            <h1 className='govuk-heading-l'>
              How do you want to find the location on a map?
            </h1>
            <p>
              We need some additional information to help us find the location.
              Select from the following options which of these you want to use.
            </p>
            <div
              className={
                searchOptionError
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              {searchOptionError && (
                <p className='govuk-error-message'>{searchOptionError}</p>
              )}
              <fieldset className='govuk-fieldset'>
                <div className='govuk-radios' data-module='govuk-radios'>
                  {searchOptions.map((option) => (
                    <Radio
                      key={option.label}
                      label={option.label}
                      value={option.value}
                      name='searchOptionsRadios'
                      onChange={(e) => setSearchOption(e.target.value)}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
            <div
              className={
                placeNameTownOrPostcodeError
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <Autocomplete
                className='govuk-input govuk-!-width-full'
                name={placeNameTownOrPostcodeText}
                inputType='text'
                error={placeNameTownOrPostcodeError}
                onChange={(val) => handleInputChange(val)}
                results={results}
                menuOpen
                value={placeNameTownOrPostcode}
                onClick={(val) => handleOnClick(val)}
                nameField='address'
              />
            </div>
            <Button
              text='Continue'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}
