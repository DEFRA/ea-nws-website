import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectedLocation } from '../../../../../common/redux/userSlice'
import LocationInAlertAreaLayout from '../../../../layouts/location/LocationInAlertAreaLayout'

export default function ChangeFloodAlertPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const pois = useSelector((state) => state.session.profile.pois)
  dispatch(setSelectedLocation(pois[0]))

  const continueToNextPage = () => {
    navigate('/signup/review')
  }

  return (
    <>
      <Helmet>
        <title>You Can Get Flood Alerts - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationInAlertAreaLayout
        continueToNextPage={continueToNextPage}
        canCancel
      />
    </>
  )
}
