import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../../../../common/layouts/email/ValidateEmailLayout'
import { addContactPreference } from '../../../../../../common/redux/userSlice'

export default function ValidateEmailContactPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const contactPreferences = useSelector(
    (state) => state.session.contactPreferences
  )

  const navigateToNextPage = () => {
    if (!contactPreferences.includes('Email')) {
      dispatch(addContactPreference('Email'))
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
    <>
      <Helmet>
        <title>Check Your Email - Next Warning Service GOV.UK</title>
      </Helmet>
      <ValidateEmailLayout
        navigateToNextPage={navigateToNextPage}
        SkipValidation={SkipValidation}
        DifferentEmail={DifferentEmail}
        NavigateToPreviousPage={DifferentEmail}
        buttonText='Continue'
      />
    </>
  )
}
