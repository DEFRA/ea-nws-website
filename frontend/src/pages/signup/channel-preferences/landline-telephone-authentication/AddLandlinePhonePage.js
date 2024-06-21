import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddLandlinePhonePage () {
  const navigate = useNavigate()
  const NavigateToNextPage = useCallback(() =>
    navigate('/signup/contactpreferences/landline/validate')
)

  return (
    <AddLandlineLayout NavigateToNextPage={NavigateToNextPage}/>
  )
}
