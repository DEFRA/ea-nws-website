import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Autocomplete from '../../../../../../common/components/gov-uk/Autocomplete'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import { setCurrentLocationCoordinates } from '../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../common/services/BackendService'
import UnmatchedLocationInfo from '../../../../../pages/manage-locations/add-location/upload-locations-with-csv/components/UnmatchedLocationInfo'

export default function LocationSearchLayout({ navigateToNextPage, flow }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showNotFound, setShowNotFound] = useState(null)
  const [placeNameOrTown, setPlaceNameOrTown] = useState('')
  const placeNameTownOrPostcodeText = 'Enter a place name or town in England'
  const [placeNameOrTownCoords, setPlaceNameOrTownCoords] = useState(null)
  const [placeNameOrTownError, setPlaceNameOrTownError] = useState('')
  const [results, setResults] = useState(null)
  const locationSearchId = 'location-search'
  const debounceRef = useRef(null)

  // remove error if user changes place name, town or postcode
  useEffect(() => {
    if (placeNameOrTownError) {
      setPlaceNameOrTownError('')
    }
  }, [placeNameOrTown])

  const fetchLocationResults = async (value) => {
    const dataToSend = {
      name: value,
      filters: [
        'City',
        'Hamlet',
        'Harbour',
        'Other_Settlement',
        'Suburban_Area',
        'Town',
        'Urban_Greenspace',
        'Village'
      ],
      loop: false
    }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/os-api/name-search',
      navigate
    )
    if (!errorMessage) {
      setResults(data)
      setPlaceNameOrTownError('')
      setShowNotFound(false)
    } else {
      // show error message from OS Api postcode search
      setPlaceNameOrTownError(errorMessage)
      setShowNotFound(true)
    }
  }

  const handleInputChange = async (value) => {
    setPlaceNameOrTown(value)
    setResults([])
  }

  const handleOnClick = (value) => {
    setPlaceNameOrTown(value.address)
    setPlaceNameOrTownCoords(value.coordinates)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedPlaceNameOrTown = placeNameOrTown.trim()
    if (trimmedPlaceNameOrTown === '') {
      setPlaceNameOrTownError(placeNameTownOrPostcodeText)
    } else if (results && results.length === 0) {
      setPlaceNameOrTownError('Place name or town is not recognised')
    }

    if (!placeNameOrTownError && placeNameOrTownCoords) {
      dispatch(setCurrentLocationCoordinates(placeNameOrTownCoords))
      navigateToNextPage(placeNameOrTown)
    }
  }

  // 1 second debounce on the OS API call
  useEffect(() => {
    if (placeNameOrTown.length < 3) {
      setResults([])
      return
    }

    if (placeNameOrTown) {
      if (isPostCode(placeNameOrTown)) {
        setPlaceNameOrTownError('Please do not enter a postcode')
        return
      }
    }

    // Clear timer
    clearTimeout(debounceRef.current)

    // Schedule fetch
    debounceRef.current = setTimeout(() => {
      fetchLocationResults(placeNameOrTown)
    }, 1000)

    // Cleanup on exit
    return () => clearTimeout(debounceRef.current)
  }, [placeNameOrTown])

  const isPostCode = (input) => {
    // UK postcode regex pattern
    const postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i
    const partialPostcodePattern =
      /^[a-z](\d\d?|[a-z]\d[a-z\d]?|[a-z]?\d?\d \d[a-z]{2}|[a-z]\d [a-z] \d[a-z]{2})$/i

    if (postcodePattern.test(input) || partialPostcodePattern.test(input)) {
      return true
    } else {
      return false
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            {placeNameOrTownError && (
              <ErrorSummary
                errorList={[
                  {
                    text: placeNameOrTownError,
                    componentId: locationSearchId
                  }
                ]}
              />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              <label for='govuk-text-input'>Find the location on a map</label>
            </h1>
            {flow?.includes('unmatched-locations') && (
              <p>
                The location you're searching for cannot be found. We need some
                additional information to help us find it.
              </p>
            )}
            {flow?.includes('unmatched-locations') && <UnmatchedLocationInfo />}

            <div
              id={locationSearchId}
              className={
                placeNameOrTownError
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <Autocomplete
                className='govuk-input govuk-!-width-full'
                name={placeNameTownOrPostcodeText}
                inputType='text'
                error={placeNameOrTownError}
                onChange={(val) => handleInputChange(val)}
                results={results}
                menuOpen
                value={placeNameOrTown}
                onClick={(val) => handleOnClick(val)}
                showNotFound={showNotFound}
                nameField='address'
                ariaDescribedBy='find-location-hint'
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
