import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import LocationSearchLayout from '../../../../layouts/location/LocationSearchLayout'

export default function ChangeLocationSearchPage () {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/signup/review/change-location-results')
  }

  return (
    <>
      <Helmet>
        <title>Check if you can get flood messages - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationSearchLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
