import React from 'react'
import { useNavigate } from 'react-router-dom'
import SelectAddressLayout from '../../layouts/address/SearchAddressResultLayout'

export default function SelectAddressPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () =>
    navigate('/organisation/register/address-confirm')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/address')
  }

  return (
    <SelectAddressLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
