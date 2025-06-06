import React, { useEffect, useState } from 'react'
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
  const [placeNameTownOrPostcode, setPlaceNameTownOrPostcode] = useState('')
  const placeNameTownOrPostcodeText = 'Enter a place name, town or postcode'
  const [placeNameTownOrPostcodeCoords, setPlaceNameTownOrPostcodeCoords] =
    useState(null)
  const [placeNameTownOrPostcodeError, setPlaceNameTownOrPostcodeError] =
    useState('')
  const [results, setResults] = useState(null)

  // remove error if user changes place name, town or postcode
  useEffect(() => {
    if (placeNameTownOrPostcodeError) {
      setPlaceNameTownOrPostcodeError('')
    }
  }, [placeNameTownOrPostcode])

  const handleInputChange = async (value) => {
    setPlaceNameTownOrPostcode(value)
    setResults([])

    const valueEmpty = value.length === 0
    const valueLongEnough = value.length >= 3
    const valueValid = !valueEmpty && valueLongEnough
    if (valueValid) {
      const dataToSend = {
        name: value,
        filters: [
          'Bay',
          'City',
          'Coastal_Headland',
          'Estuary',
          'Group_Of_Islands',
          'Harbour',
          'Island',
          'Other_Settlement',
          'Suburban_Area',
          'Tidal_Water',
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
        setPlaceNameTownOrPostcodeError('')
        setShowNotFound(false)
      } else {
        // show error message from OS Api postcode search
        setPlaceNameTownOrPostcodeError(errorMessage)
        setShowNotFound(true)
      }
    } else {
      setShowNotFound(false)
    }
  }

  const handleOnClick = (value) => {
    setPlaceNameTownOrPostcode(value.address)
    setPlaceNameTownOrPostcodeCoords(value.coordinates)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedPlaceNameTownOrPostcode = placeNameTownOrPostcode.trim()
    if (trimmedPlaceNameTownOrPostcode === '') {
      setPlaceNameTownOrPostcodeError(placeNameTownOrPostcodeText)
    } else if (results && results.length === 0) {
      setPlaceNameTownOrPostcodeError(
        'Place name, town or postcode is not recognised'
      )
    }

    if (!placeNameTownOrPostcodeError && placeNameTownOrPostcodeCoords) {
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
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            {placeNameTownOrPostcodeError && (
              <ErrorSummary errorList={[placeNameTownOrPostcodeError]} />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              Find the location on a map
            </h1>
            {flow?.includes('unmatched-locations') && (
              <p>
                The location you're searching for cannot be found. We need some
                additional information to help us find it.
              </p>
            )}
            {flow?.includes('unmatched-locations') && <UnmatchedLocationInfo />}

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
                showNotFound={showNotFound}
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
