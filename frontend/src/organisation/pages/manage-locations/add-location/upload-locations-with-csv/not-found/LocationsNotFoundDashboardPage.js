import { React } from 'react'
import { useNavigate } from 'react-router'
import UnmatchedLocationsDashboardLayout from '../../../../../layouts/location/upload-locations-with-csv/unmatched-locations/UnmatchedLocationsDashboardLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationsNotFoundDashboardPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () =>
    // TODO: navigate to correct page when available
    navigate(orgManageLocationsUrls.view.dashboard)

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
