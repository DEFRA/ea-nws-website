import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import { backendCall } from '../../../common/services/BackendService'

export default function ConfirmAddressLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)
  const address = useSelector(
    (state) => state.session.organisation.address.name
  )

  const updateGeosafeProfile = async () => {
    const dataToSend = { authToken, profile }
    await backendCall(dataToSend, 'api/profile/update', navigate)
  }

  const handleSubmit = async () => {
    // Correct address is already stored in
    // state.session.organisation.address
    NavigateToNextPage()
  }

  const navigateBack = async (event) => {
    // Remove address from geosafe api
    await updateGeosafeProfile()

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
              onClick={navigateBack}
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
