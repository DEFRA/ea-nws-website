import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddAddressLayout from '../../../../layouts/address/AddAddressLayout'
import { orgSignUpUrls } from '../../../../routes/sign-up/SignUpRoutes'

export default function ChangeAddressPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.address.select, { state: { returnToReview: true } })
  }

  const NavigateToPreviousPage = () => {
    navigate(navigate(-1))
  }

  const navigateToConfirmPage = () => {
    navigate(orgSignUpUrls.address.confirm, { state: { returnToReview: true } })
  }

  return (
    <AddAddressLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      navigateToConfirmPage={navigateToConfirmPage}
    />
  )
}
