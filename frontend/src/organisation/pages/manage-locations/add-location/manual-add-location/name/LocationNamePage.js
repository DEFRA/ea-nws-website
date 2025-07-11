import { React, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../../../common/components/gov-uk/Input'
import { setCurrentLocationName } from '../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../common/services/BackendService'
import { locationNameValidation } from '../../../../../../common/services/validations/LocationNameValidation'
import {
  orgManageLocationsUrls,
  urlManageOrgAddLocations
} from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationNamePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const locationNameId = 'location-name'
  const authToken = useSelector((state) => state.session.authToken)

  const locationNameUsedBefore = async (locationName) => {
    const dataToSend = { authToken, locationName }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/locations/check_duplicate',
      navigate
    )

    if (errorMessage) {
      if (errorMessage === 'duplicate location') {
        setError('')
        return errorMessage
      } else {
        setError('Something went wrong, try again')
      }
    } else {
      setError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const locationName = name.trim()
    const validationError = locationNameValidation(locationName)
    if (validationError) {
      setError(validationError)
    } else {
      const duplicateFound = await locationNameUsedBefore(locationName)
      if (error === '') {
        dispatch(setCurrentLocationName(locationName))

        if (duplicateFound) {
          navigate(orgManageLocationsUrls.add.error.alreadyExists)
        } else {
          navigate(orgManageLocationsUrls.add.search.searchOption)
        }
      }
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(urlManageOrgAddLocations)
  }

  return (
    <>
      <Helmet>
        <title>
          What's the location name? - Manage locations - Get flood warnings
          (professional) - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && (
              <ErrorSummary
                errorList={[{ text: error, componentId: locationNameId }]}
              />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              What is the location name?
            </h1>
            <div className='govuk-body'>
              <p>
                How you refer to the location, for example: head office, Brayton
                Water pumping station.
              </p>
              <Input
                id={locationNameId}
                name='Location name'
                inputType='text'
                value={name}
                onChange={(val) => setName(val)}
                error={error}
                className='govuk-input govuk-input--width-20'
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
