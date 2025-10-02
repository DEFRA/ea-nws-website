import { React } from 'react'
import { Helmet } from 'react-helmet'
import ConfirmLocationLayout from '../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { useVerifyLocationInFloodArea } from '../not-flood-area/verfiyLocationInFloodAreaAndNavigate'

export default function ConfirmShapefilePolygonPage () {
  const verifyLocationInFloodAreaAndNavigate = useVerifyLocationInFloodArea()

  const navigateToNextPage = async () => {
    await verifyLocationInFloodAreaAndNavigate(orgManageLocationsUrls.add.linkLocationToContacts)
  }

  return (
    <>
      <Helmet>
        <title>Confirm location - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <ConfirmLocationLayout
        navigateToNextPage={navigateToNextPage}
        layoutType='shape'
      />
    </>
  )
}
