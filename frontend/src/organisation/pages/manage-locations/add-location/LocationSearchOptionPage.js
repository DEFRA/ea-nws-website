import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'

export default function LocationSearchOptionPage () {
  const navigate = useNavigate()

  const NavigateToPostcodeSearchPage = () => {
    navigate('/organisation/manage-locations/add/postcode-search')
  }

  // TODO: set this to point to the correct page when it exists
  const NavigateToXYSearchPage = () => {
    navigate('/organisation/manage-locations/add/xy-search')
  }

  // TODO: set this to point to the correct page when it exists
  const NavigateToPinSearchPage = () => {
    navigate('/organisation/manage-locations/add/pin-search')
  }

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  const [searchOption, setSearchOption] = useState('')
  const [error, setError] = useState('')

  // remove any errors if user changes search option
  useEffect(() => {
    setError('')
  }, [searchOption])

  const handleSubmit = async () => {
    if (!searchOption) {
      setError('Select how you want to find this location')
    } else {
      switch (searchOption) {
        case 'UseAPostcode':
          NavigateToPostcodeSearchPage()
          break
        case 'UseXAndYCoordinates':
          NavigateToXYSearchPage()
          break
        case 'DropAPinOnAMap':
          NavigateToPinSearchPage()
          break
        default:
          break
      }
    }
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  const locationName = useSelector((state) => state.session.locationName)
  const heading = 'How do you want to find ' + locationName + '?'

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>{heading}</h1>
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
                <Radio
                  label='Use a postcode'
                  value='UseAPostcode'
                  name='searchOptionsRadios'
                  onChange={(e) => setSearchOption(e.target.value)}
                />
                <Radio
                  label='Use X and Y coordinates'
                  value='UseXAndYCoordinates'
                  name='searchOptionsRadios'
                  onChange={(e) => setSearchOption(e.target.value)}
                />
                <Radio
                  label='Drop a pin on a map'
                  value='DropAPinOnAMap'
                  name='searchOptionsRadios'
                  onChange={(e) => setSearchOption(e.target.value)}
                />
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
