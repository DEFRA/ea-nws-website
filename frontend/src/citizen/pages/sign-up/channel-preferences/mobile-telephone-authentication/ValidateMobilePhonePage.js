import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidateMobileLayout from '../../../../layouts/mobile/ValidateMobileLayout'
export default function ValidateMobilePhone () {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)

  const NavigateToNextPage = () => {
    if (session.contactPreferences.includes('Email')) {
      // navigate to email TODO - cameron add this once merged
    } else if (session.contactPreferences.includes('Landline')) {
      navigate('/signup/contactpreferences/landline/add')
    } else {
      navigate('/signup/accountname/add')
    }
  }
  const SkipValidation = () => {
    navigate('/signup/contactpreferences/mobile/skipconfirmation')
  }
  const DifferentMobile = (mobile) => {
    navigate('/signup/contactpreferences/mobile/add', {
      state: {
        mobile
      }
    })
  }
  return (
    <ValidateMobileLayout
      NavigateToNextPage={NavigateToNextPage}
      SkipValidation={SkipValidation}
      DifferentMobile={DifferentMobile}
    />
  )
}
