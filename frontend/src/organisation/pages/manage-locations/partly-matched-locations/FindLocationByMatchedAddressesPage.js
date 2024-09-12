import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../../common/components/gov-uk/InsetText'
import Select from '../../../../common/components/gov-uk/Select'
export default function FindLocationByMatchedAddressesPage() {
  const navigate = useNavigate()
  const selectedLocation = '25A BELGRAVE ROAD'
  /*useSelector(
    (state) => state.session.selectedLocation
  )*/
  const [selectedAddress, setSelectedAddress] = useState('')
  const [error, setError] = useState('')
  const availableAddresses = useSelector(
    (state) => state.session.locationSearchResults
  )
  console.log(availableAddresses)
  useEffect(() => {
    setError('')
  }, [selectedAddress])

  const handleContinue = async () => {
    if (!selectedAddress) {
      setError('Select an address')
    } else {
      navigate('/organisation/manage-locations/add')
    }
  }

  const options = availableAddresses.map((item) => ({
    value: item.name.replace(/\s+/g, ''),
    label: item.name
  }))

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              Select from a drop-down list of partly matches addresses
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
                  options={options}
                  name='availableAddressesDropDown'
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  hint=''
                  error={error}
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
