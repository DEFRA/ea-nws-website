import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../../common-layouts/landline/ValidateLandlineLayout'
export default function ValidateLandlinePhonePage () {  
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)

  const NavigateToNextPage = useCallback(() => {
    if (session.contactPreferences.includes('Email')) {
      // navigate to email TODO - cameron add this once merged
    } else if (session.contactPreferences.includes('Mobile')) {
      navigate('/signup/contactpreferences/mobile/add')
    } else {
      // To change following updated flow
      navigate('/managecontacts')
    }}
  )
  const SkipValidation = useCallback(() => 
    navigate('/signup/contactpreferences/landline/skipconfirmation')
  )
  const DifferentHomePhone = useCallback((homePhone) => 
    navigate('/signup/contactpreferences/landline/add', {
      state: {
        homePhone: homePhone
      }
    })
  )

  return (
    <ValidateLandlineLayout NavigateToNextPage={NavigateToNextPage} SkipValidation={SkipValidation} DifferentHomePhone={DifferentHomePhone} />
  )
}
