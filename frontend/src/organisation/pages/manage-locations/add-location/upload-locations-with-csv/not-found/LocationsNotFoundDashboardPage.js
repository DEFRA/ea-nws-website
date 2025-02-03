import { React } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import UnmatchedLocationsDashboardLayout from '../../../../../layouts/location/upload-locations-with-csv/unmatched-locations/UnmatchedLocationsDashboardLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationsNotFoundDashboardPage () {
  const navigate = useNavigate()
  const notInEnglandLocations = useSelector(
    (state) => state.session.notInEnglandLocations
  )

  const navigateToNextPage = () =>
    // TODO: navigate to correct page when available
    notInEnglandLocations > 0
      ? navigate(
        orgManageLocationsUrls.unmatchedLocations.notInEngland.dashboard
      )
      : navigate(orgManageLocationsUrls.view.dashboard)

  const navigateToFindLocation = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.find)

  return (
    <>
      <UnmatchedLocationsDashboardLayout
        navigateToNextPage={navigateToNextPage}
        navigateToFindLocation={navigateToFindLocation}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
