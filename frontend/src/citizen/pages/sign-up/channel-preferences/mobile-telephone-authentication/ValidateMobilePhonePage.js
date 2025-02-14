import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidateMobileLayout from '../../../../layouts/mobile/ValidateMobileLayout'

export default function ValidateMobilePhone () {
  const navigate = useNavigate()
  const contactPreferences = useSelector(
    (state) => state.session.contactPreferences
  )

  const navigateToNextPage = (mobile) => {
    if (contactPreferences.includes('PhoneCall')) {
      navigate('/signup/contactpreferences/landline/add', { state: { banner: { heading: 'Mobile number confirmed', text: mobile } } })
    } else {
      navigate('/signup/accountname/add', { state: { banner: { heading: 'Mobile number confirmed', text: mobile } } })
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
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={DifferentMobile}
      SkipValidation={SkipValidation}
      DifferentMobile={DifferentMobile}
    />
  )
}
