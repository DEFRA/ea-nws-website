import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../../common/components/gov-uk/InsetText'
import Radio from '../../../../common/components/gov-uk/Radio'
import { setLocationSearchResults } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
export default function SelectHowToFindThisLocationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [findLocationOption, setFindLocationOption] = useState('')
  const [error, setError] = useState('')
  const findLocationOptions = [
    {
      value: 'Dropdown',
      label: 'Select from a drop-down list of partly matches addresses'
    },
    { value: 'Map', label: 'Find location on a map' }
  ]

  const selectedLocation = '25A BELGRAVE ROAD'
  /*useSelector(
    (state) => state.session.selectedLocation
  ) */

  const findAvailableAddresses = async () => {
    const dataToSend = {
      name: selectedLocation,
      minmatch: 0.5
    }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/os-api/name-minmatch-search',
      navigate
    )
    if (!errorMessage) {
      dispatch(setLocationSearchResults(data))
    } else {
      // show error message from OS Api postcode search
      setError('There was an error')
    }
  }

  const handleContinue = async () => {
    if (!findLocationOption) {
      setError('Select if you want to manually find, or not add, locations')
    } else if (findLocationOption === findLocationOptions[0].value) {
      await findAvailableAddresses()
      if (!error || error === '') {
        navigate(
          '/organisation/manage-locations/unmatched-locations/find-by-addresses'
        )
      }
    } else {
      navigate('/') // Navigate to map
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              How do you want to find this location?
            </h1>
            <div className='govuk-body'>
              <InsetText text={selectedLocation} />
              <div
                className={
                  error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                {error && <p className='govuk-error-message'>{error}</p>}
                <div className='govuk-radios' data-module='govuk-radios'>
                  {findLocationOptions.map((option) => (
                    <Radio
                      key={option.value}
                      id={option.value}
                      name='findLocationOptionRadios'
                      label={option.label}
                      type='radio'
                      value={option.value}
                      onChange={() => setFindLocationOption(option.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <br />
            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleContinue}
            />
          </div>
        </div>
      </main>
    </>
  )
}
