import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddAddressLayout from '../../layouts/address/AddAddressLayout'

export default function AddAddressPage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => {
    navigate('/organisation/sign-up/address-search')
  }
  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up')
  }

  return (
    <AddAddressLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
