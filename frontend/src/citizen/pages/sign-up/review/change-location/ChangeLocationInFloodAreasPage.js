import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getAdditional,
  setProfile
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import LocationInFloodAreasLayout from '../../../../layouts/location/LocationInFloodAreasLayout'

export default function ChangeLocationInFloodAreasPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const authToken = useSelector((state) => state.session.authToken)

  const continueToNextPage = async (profile) => {
    console.log('profile', profile)
    console.log('selectedLocation', selectedLocation)

    // remove all previous locations
    const updatedPois = profile.pois.filter(
      (loc) =>
        loc.address !== selectedLocation.address ||
        getAdditional(loc?.additionals, 'locationName') !==
          selectedLocation.address
    )

    console.log('updated pois', updatedPois)

    const updatedProfile = {
      ...profile,
      pois: updatedPois
    }

    const dataToSend = { authToken, profile: updatedProfile }
    await backendCall(dataToSend, 'api/profile/update', navigate)

    dispatch(setProfile(updatedProfile))

    navigate('/signup/review')
  }

  const searchResultsPage = '/signup/review/change-location-results'

  return (
    <>
      <LocationInFloodAreasLayout
        continueToNextPage={continueToNextPage}
        searchResultsPage={searchResultsPage}
      />
    </>
  )
}
