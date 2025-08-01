import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import TextArea from '../../../common/components/gov-uk/TextArea'
import { setCurrentLocationAddress } from '../../../common/redux/userSlice'

export default function AddressLayout({
  navigateToNextPage,
  additionalInfo = '',
  error,
  setError
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentAddress = useSelector(
    (state) => state.session.currentLocation.address
  )
  const [address, setAddress] = useState(currentAddress || '')
  const charLimit = 200
  const locationAddressId = 'location-address'

  useEffect(() => {
    if (address.length > charLimit) {
      setError(`You can enter up to ${charLimit} characters`)
    } else {
      setError('')
    }
  }, [address])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (error) return
    dispatch(setCurrentLocationAddress(address))
    navigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-margin-top-5'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[{text: error, componentId: locationAddressId}]} />}
            <h1 className='govuk-heading-l' id='main-content'>
              What is the address?
            </h1>
            {additionalInfo && <>{additionalInfo}</>}
            <TextArea
              id={locationAddressId}
              error={error}
              className='govuk-textarea'
              rows={5}
              value={address}
              onChange={(val) => setAddress(val)}
              additionalInfo='You can add up to 200 characters'
            />
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
