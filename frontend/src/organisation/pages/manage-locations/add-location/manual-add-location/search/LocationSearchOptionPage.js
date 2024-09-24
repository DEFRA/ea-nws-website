import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../../../common/components/gov-uk/Radio'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationSearchOptionPage() {
  const navigate = useNavigate()

  const [searchOption, setSearchOption] = useState('')
  const [error, setError] = useState('')

  // remove any errors if user changes search option
  useEffect(() => {
    setError('')
  }, [searchOption])

  const handleSubmit = () => {
    if (!searchOption) {
      setError('Select how you want to find this location')
    } else {
      switch (searchOption) {
        case 'UseAPostcode':
          navigate(orgManageLocationsUrls.add.postCodeSearch)
          break
        case 'UseXAndYCoordinates':
          navigate(orgManageLocationsUrls.add.xyCoordinatesSearch)
          break
        case 'DropAPinOnAMap':
          // TODO: Uncomment when page available
          //navigate(orgManageLocationsUrls.add.dropPinSearch)
          break
        default:
          break
      }
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const locationName = useSelector(
    (state) => state.session.currentLocation.name
  )
  const searchOptions = [
    { label: 'Use a postcode', value: 'UseAPostcode' },
    { label: 'Use X and Y coordinates', value: 'UseXAndYCoordinates' },
    { label: 'Drop a pin on a map', value: 'DropAPinOnAMap' }
  ]

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              How do you want to find {locationName}?
            </h1>
            <p>
              If your location is a polygon, or a line, your orgainsation has
              created you'll need to upload your location as a shapefile in a
              .zip file.
            </p>
            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              {error && <p className='govuk-error-message'>{error}</p>}
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
