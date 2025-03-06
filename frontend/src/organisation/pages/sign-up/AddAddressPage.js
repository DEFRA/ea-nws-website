import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddAddressLayout from '../../layouts/address/AddAddressLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function AddAddressPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.address.select)
  }
  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.signUp)
  }

  return (
    <AddAddressLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
