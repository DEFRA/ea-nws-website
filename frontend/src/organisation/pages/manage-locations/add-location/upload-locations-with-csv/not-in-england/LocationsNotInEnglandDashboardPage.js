import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import UnmatchedLocationsDashboardLayout from '../../../../../layouts/location/upload-locations-with-csv/unmatched-locations/UnmatchedLocationsDashboardLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationsNotFoundDashboardPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.add.contactLinkInfo)

  const navigateToLocationInfo = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.info)

  return (
    <>
      <Helmet>
        <title>Locations Not In England - GOV.UK</title>
      </Helmet>
      <UnmatchedLocationsDashboardLayout
        navigateToNextPage={navigateToNextPage}
        navigateToFindLocation={navigateToLocationInfo}
        flow='unmatched-locations-not-in-england'
      />
    </>
  )
}
