import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidateMobileLayout from '../../../../common-layouts/mobile/ValidateMobileLayout'
import SkipConfirmLayout from '../../../../common-layouts/skip-confirm/SkipConfirmLayout'

export default function ValidateMobilePhone () {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)

  const NavigateToNextPage = () => {
    if (session.contactPreferences.includes('PhoneCall')) {
      navigate('/signup/contactpreferences/landline/add')
    } else {
      navigate('/signup/accountname/add')
    }
  }
  const SkipValidation = (mobile) => {
    <SkipConfirmLayout
      contactPreference={mobile}
    />
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
      NavigateToPreviousPage={DifferentMobile}
      SkipValidation={SkipValidation}
      DifferentMobile={DifferentMobile}
    />
  )
}
