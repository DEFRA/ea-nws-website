import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import AddAddressLayout from '../../layouts/address/AddAddressLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function AddAddressPage() {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.address.select)
  }

  const navigateToPreviousPage = () => {
    navigate(navigate(-1))
  }

  const navigateToConfirmPage = () => {
    navigate(orgSignUpUrls.address.confirm)
  }

  const enterAddressManually = orgSignUpUrls.address.return(
    <>
      <Helmet>
        <title>
          Your organisation's head office address - Get flood warnings
          (professional) - GOV.UK
        </title>
      </Helmet>
      <AddAddressLayout
        navigateToNextPage={navigateToNextPage}
        navigateToPreviousPage={navigateToPreviousPage}
        navigateToConfirmPage={navigateToConfirmPage}
      />
    </>
  )
}
