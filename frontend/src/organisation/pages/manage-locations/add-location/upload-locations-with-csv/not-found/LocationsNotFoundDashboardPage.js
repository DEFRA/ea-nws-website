import { React } from 'react'
import { Helmet } from 'react-helmet'
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
    notInEnglandLocations > 0
      ? navigate(
        orgManageLocationsUrls.unmatchedLocations.notInEngland.dashboard
      )
      : navigate(orgManageLocationsUrls.add.contactLinkInfo)

  const navigateToFindLocation = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.find)

  return (
    <>
      <Helmet>
        <title>Locations Not Found - GOV.UK</title>
      </Helmet>
      <UnmatchedLocationsDashboardLayout
        navigateToNextPage={navigateToNextPage}
        navigateToFindLocation={navigateToFindLocation}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
