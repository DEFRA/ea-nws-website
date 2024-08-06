import React from 'react'
import { useNavigate } from 'react-router-dom'
import SelectOrganisationAddressLayout from '../../layouts/organisation-address/SelectOrganisationAddressLayout'

export default function SelectOrganisationAddressPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () =>
    navigate('/organisation/register/address-confirm')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/address')
  }

  return (
    <SelectOrganisationAddressLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
