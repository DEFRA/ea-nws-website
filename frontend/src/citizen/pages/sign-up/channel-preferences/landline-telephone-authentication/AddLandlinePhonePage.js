import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AddLandlineLayout from '../../../../layouts/landline/AddLandlineLayout'

export default function AddLandlinePhonePage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () =>
    navigate('/signup/contactpreferences/landline/validate')

  const NavigateToPreviousPage = () =>
    navigate('/signup/contactpreferences')

  return <AddLandlineLayout NavigateToNextPage={NavigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage} />
}
