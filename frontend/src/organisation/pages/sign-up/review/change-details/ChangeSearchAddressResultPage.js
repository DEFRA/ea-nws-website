import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import SearchAddressResultsLayout from '../../../../layouts/address/SearchAddressResultLayout'
import { orgSignUpUrls } from '../../../../routes/sign-up/SignUpRoutes'

export default function SelectAddressPage() {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.change.confirmAddress)
  }

  const navigateToPreviousPage = () => navigate(orgSignUpUrls.change.address)

  const navigateToManualAddressEntry = () => {
    navigate(orgSignUpUrls.change.manuallyAdd)
  }

  return (
    <>
      <Helmet>
        <title>
          Select an address - Get flood warnings (professional) - GOV.UK
        </title>
      </Helmet>
      <SearchAddressResultsLayout
        navigateToNextPage={navigateToNextPage}
        navigateToPreviousPage={navigateToPreviousPage}
        navigateToManualAddressEntry={navigateToManualAddressEntry}
      />
    </>
  )
}
