import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addContactPreference } from '../../../../../../common/redux/userSlice'
import ValidateEmailLayout from '../../../../../../common/layouts/email/ValidateEmailLayout'

export default function ValidateEmailContactPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const contactPreferences = useSelector(
    (state) => state.session.contactPreferences
  )

  const NavigateToNextPage = () => {
    if (!contactPreferences.includes('Email Address')) {
      dispatch(addContactPreference('Email Address'))
    }
    navigate('/signup/review')
  }
  const SkipValidation = () => {
    navigate('/signup/review')
  }
  const DifferentEmail = () => {
    navigate('/signup/review/add-email')
  }

  return (
    <ValidateEmailLayout
      NavigateToNextPage={NavigateToNextPage}
      SkipValidation={SkipValidation}
      DifferentEmail={DifferentEmail}
      NavigateToPreviousPage={DifferentEmail}
      buttonText='Continue'
    />
  )
}
