import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../../common/components/custom/BackLink'
import Autocomplete from '../../../../../../../../common/components/gov-uk/Autocomplete'
import Button from '../../../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../../../../../../common/components/gov-uk/InsetText'
import {
  setCurrentLocationCoordinates
} from '../../../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ProvideAreaNamePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fullAddress = useSelector((state) => state.session.currentLocation.meta_data.location_additional.full_address)
  const [areaName, setAreaName] = useState('')
  const [areaCoords, setAreaCoords] = useState(null)
  const [error, setError] = useState('')
  const [results, setResults] = useState(null)

  const handleInputChange = async (value) => {
    setAreaName(value)
    const query = value
    const queryEmpty = query.length === 0
    const queryLongEnough = query.length >= 3

    const searchForOptions = !queryEmpty && queryLongEnough
    if (searchForOptions) {
      const dataToSend = {
        name: value
      }
      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/os-api/name-search',
        navigate
      )
      if (!errorMessage) {
        setResults(data)
        setError('')
      } else {
        setResults([])
        // show error message from OS Api postcode search
        setError('Place name, town or postcode is not recognised')
      }
    }
  }

  const handleOnClick = async (value) => {
    setAreaName(value.name)
    setAreaCoords(value.coordinates)
  }

  const handleSubmit = async () => {
    if (areaName === '') {
      setError('Enter a place name, town or postcode')
    } else if (areaCoords === null) {
      setError('Select an option from the dropdown')
    } else {
      dispatch(setCurrentLocationCoordinates(areaCoords))
      navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.map)
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.index)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && (
              <ErrorSummary
                errorList={[error]}
              />
            )}
            <h1 className='govuk-heading-l'>Find location on a map</h1>
            <div className='govuk-body'>
              <InsetText text={fullAddress} />
              <p>
                This location cannot be found. We need some additional information to help us find it
              </p>
              <Autocomplete
                className='govuk-input govuk-!-width-full'
                name='Enter a place name, town or postcode'
                inputType='text'
                error={error}
                onChange={(val) => handleInputChange(val)}
                results={results}
                menuOpen
                value={areaName}
                onClick={(val) => handleOnClick(val)}
              />
            </div>
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
