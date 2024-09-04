import React from 'react'
import { useNavigate } from 'react-router-dom'
import SelectAddressLayout from '../../layouts/address/SearchAddressResultLayout'

export default function SelectAddressPage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () =>
    navigate('/organisation/sign-up/address-confirm')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/address')
  }

  return (
    <SelectAddressLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
