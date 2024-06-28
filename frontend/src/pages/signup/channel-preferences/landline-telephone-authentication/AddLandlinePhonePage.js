import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AddLandlineLayout from '../../../../common-layouts/landline/AddLandlineLayout'

export default function AddLandlinePhonePage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () =>
    navigate('/signup/contactpreferences/landline/validate')

  return <AddLandlineLayout NavigateToNextPage={NavigateToNextPage} />
}
