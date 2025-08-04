import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import EnterAddressManuallyLayout from '../../../../layouts/address/EnterAddressManuallyLayout'
import { orgSignUpUrls } from '../../../../routes/sign-up/SignUpRoutes'

export default function ManuallyAddAddressPage() {
  const navigate = useNavigate()

  const navigateToConfirmPage = () => {
    navigate(orgSignUpUrls.change.confirmAddress)
  }

  const navigateToSearchResultsPage = () => {
    navigate(orgSignUpUrls.change.selectAddress)
  }

  const navigateToAddAddressPage = () => {
    navigate(orgSignUpUrls.change.address)
  }

  return (
    <>
      <Helmet>
        <title>
          Your organisation's head office address - Get flood warnings
          (professional) - GOV.UK
        </title>
      </Helmet>
      <EnterAddressManuallyLayout
        navigateToConfirmPage={navigateToConfirmPage}
        navigateToSearchResultsPage={navigateToSearchResultsPage}
        navigateToAddAddressPage={navigateToAddAddressPage}
      />
    </>
  )
}
