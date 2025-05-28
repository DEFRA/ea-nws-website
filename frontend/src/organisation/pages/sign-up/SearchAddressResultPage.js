import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchAddressResultLayout from '../../layouts/address/SearchAddressResultLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function SelectAddressPage () {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateToNextPage = () => {
    if (location.state?.returnToReview) {
      navigate(orgSignUpUrls.address.confirm, {
        state: { returnToReview: true }
      })
    } else {
      navigate(orgSignUpUrls.address.confirm)
    }
  }

  const navigateToPreviousPage = () => navigate(orgSignUpUrls.address.add)

  const navigateToFindPostcodePage = () => navigate(orgSignUpUrls.address.add)

  return (
    <>
      <Helmet>
        <title>Search Address Results - GOV.UK</title>
      </Helmet>
      <SearchAddressResultLayout
        navigateToNextPage={navigateToNextPage}
        navigateToPreviousPage={navigateToPreviousPage}
        navigateToFindPostcodePage={navigateToFindPostcodePage}
      />
    </>
  )
}
