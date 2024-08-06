import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddOrganisationAddressLayout from '../../layouts/address/AddOrganisationAddressLayout'

export default function AddOrganisationAddressPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => {
    navigate('/organisation/register/address-search')
  }
  const NavigateToPreviousPage = () => {
    navigate('/organisation/register')
  }

  return (
    <AddOrganisationAddressLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
