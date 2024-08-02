import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LocationInAlertAreaLayout from '../../../../common-layouts/location/LocationInAlertAreaLayout'
import { setSelectedLocation } from '../../../../redux/userSlice'

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
      <LocationInAlertAreaLayout
        continueToNextPage={continueToNextPage}
        canCancel
      />
    </>
  )
}
