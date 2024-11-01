import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import TextArea from '../../../../../common/components/gov-uk/TextArea'
import { setCurrentLocationFullAddress } from '../../../../../common/redux/userSlice'

export default function AddressLayout({
  navigateToNextPage,
  additionalInfo = ''
}) {
  const navigate = useNavigate()
  const currentAddress = useSelector(
    (state) => state.session.currentLocation.address
  )
  const [address, setAddress] = useState(currentAddress ? currentAddress : '')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setCurrentLocationFullAddress(address))
    navigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>What is the address?</h1>
            {additionalInfo && <>{additionalInfo}</>}
            <TextArea
              className='govuk-textarea'
              name={'What is your address?'}
              rows={5}
              value={address}
              onChange={(val) => setAddress(val)}
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
