import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchAddressResultLayout from '../../layouts/address/SearchAddressResultLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function SelectAddressPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => navigate(orgSignUpUrls.address.confirm)

  const navigateToPreviousPage = () => navigate(orgSignUpUrls.address.add)

  const navigateToFindPostcodePage = () => navigate(orgSignUpUrls.address.add)

  return (
    <SearchAddressResultLayout
      navigateToNextPage={navigateToNextPage}
      navigateToPreviousPage={navigateToPreviousPage}
      navigateToFindPostcodePage={navigateToFindPostcodePage}
    />
  )
}
