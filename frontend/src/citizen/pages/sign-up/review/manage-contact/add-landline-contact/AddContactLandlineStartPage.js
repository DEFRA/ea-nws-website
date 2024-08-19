import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AddLandlineLayout from '../../../../../layouts/landline/AddLandlineLayout'

export default function AddLandlineContactPage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () =>
    navigate('/signup/review/validate-landline')

  return <AddLandlineLayout NavigateToNextPage={NavigateToNextPage} />
}
