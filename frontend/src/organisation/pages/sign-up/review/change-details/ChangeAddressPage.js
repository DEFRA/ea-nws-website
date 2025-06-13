import React from 'react'
import { Helmet } from 'react-helmet'
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
    <>
      <Helmet>
        <title>Change organisation's head office address - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <AddAddressLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
        navigateToConfirmPage={navigateToConfirmPage}
      />
    </>
  )
}
