import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddLandlineLayout from '../../../../layouts/landline/AddLandlineLayout'
import SelectAlternativeLandlineLayout from '../../../../layouts/landline/SelectAlternativeLandlineLayout'

export default function AddLandlinePhonePage () {
  const profile = useSelector((state) => state.session.profile)
  const navigate = useNavigate()
  const NavigateToNextWithValidationPage = () =>
    navigate('/signup/contactpreferences/landline/validate')

  const NavigateToPreviousPage = () => navigate('/signup/contactpreferences')

  const NavigateToNextWithoutValidation = () =>
    navigate('/signup/accountname/add')

  return (
    <>
      <Helmet>
        <title>Enter a telephone number - Get flood warnings - GOV.UK</title>
      </Helmet>
      {profile.unverified?.mobilePhones || profile.mobilePhones
        ? (
          <SelectAlternativeLandlineLayout
            NextPageWithoutValidation={NavigateToNextWithoutValidation}
            NextPageWithValidation={NavigateToNextWithValidationPage}
            NavigateBack={NavigateToPreviousPage}
          />
          )
        : (
          <AddLandlineLayout
            navigateToNextPage={NavigateToNextWithValidationPage}
            NavigateToPreviousPage={NavigateToPreviousPage}
          />
          )}
    </>
  )
}
