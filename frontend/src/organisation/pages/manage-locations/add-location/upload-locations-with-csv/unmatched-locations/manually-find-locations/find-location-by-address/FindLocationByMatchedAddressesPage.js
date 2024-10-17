import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../../../../../../common/components/gov-uk/InsetText'
import Select from '../../../../../../../../common/components/gov-uk/Select'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationByMatchedAddressesPage() {
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.full_address
  )
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null)
  const [error, setError] = useState('')
  const availableAddresses = useSelector(
    (state) => state.session.locationSearchResults
  )

  useEffect(() => {
    setError('')
  }, [selectedAddressIndex])

  const handleContinue = async () => {
    if (!selectedAddressIndex) {
      setError('Select an address')
    } else {
      navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.index)
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
              Select from a drop-down list of partly matched addresses
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
                <Select
                  label='Select an address'
                  options={availableAddresses}
                  name='availableAddressesDropDown'
                  onSelect={(e) => setSelectedAddressIndex(e.target.value)}
                  hint=''
                  error={error}
                  initialSelectOptionText={`Select from ${
                    availableAddresses.length
                  } address${availableAddresses.lenght > 1 ? 'es' : ''} partly
          matched`}
                />
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
