import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchAddressResultLayout from '../../layouts/address/SearchAddressResultLayout'

export default function SelectAddressPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () =>
    navigate('/organisation/sign-up/address-confirm')

  const navigateToPreviousPage = () => navigate('/organisation/sign-up/address')

  return (
    <SearchAddressResultLayout
      navigateToNextPage={navigateToNextPage}
      navigateToPreviousPage={navigateToPreviousPage}
    />
  )
}
