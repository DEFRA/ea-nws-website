import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getAdditional,
  setProfile
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import LocationNearFloodAreasLayout from '../../../../layouts/location/LocationNearFloodAreasLayout'

export default function ChangeLocationInFloodAreasPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const authToken = useSelector((state) => state.session.authToken)

  const continueToNextPage = async (profile) => {
    const currentLocations = profile.pois
    // remove all previous locations
    const updatedPois = currentLocations.filter(
      (loc) =>
        loc.address === selectedLocation.address ||
        getAdditional(loc?.additionals, 'locationName') ===
          selectedLocation.address
    )

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
      <LocationNearFloodAreasLayout
        continueToNextPage={continueToNextPage}
        searchResultsPage={searchResultsPage}
      />
    </>
  )
}
