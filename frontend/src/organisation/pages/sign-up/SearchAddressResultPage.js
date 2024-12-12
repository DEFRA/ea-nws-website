import React from 'react'
import { useNavigate } from 'react-router-dom'
import SelectAddressLayout from '../../layouts/address/SearchAddressResultLayout'

export default function SelectAddressPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () =>
    navigate('/organisation/sign-up/address-confirm')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/address')
  }

  return (
    <SelectAddressLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
