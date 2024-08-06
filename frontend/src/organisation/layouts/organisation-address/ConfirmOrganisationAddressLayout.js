import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'

export default function ConfirmOrganisationAddressLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const navigate = useNavigate()
  const address = useSelector((state) => state.session.selectedLocation.name)

  const handleSubmit = async () => {
    console.log('Confirm')
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>Confirm address</h1>
            <p className='govuk-inset-text'>{address}</p>
            <Button
              text='Confirm'
              className='govuk-button'
              onClick={handleSubmit}
            />
            <Link
              onClick={navigate(-1)}
              className='govuk-link govuk-!-padding-left-5'
            >
              Choose different address
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
