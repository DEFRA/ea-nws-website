import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddOrganisationAddressLayout from '../../layouts/organisation-address/AddOrganisationAddressLayout'

export default function AddOrganisationAddressPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('#')

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
