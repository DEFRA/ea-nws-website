import { React } from 'react'
import ConfirmLocationLayout from '../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { useVerifyLocationInFloodArea } from '../not-flood-area/verfiyLocationInFloodAreaAndNavigate'

export default async function ConfirmShapefilePolygonPage () {
  const verifyLocationInFloodAreaAndNavigate = useVerifyLocationInFloodArea()

  const navigateToNextPage = await verifyLocationInFloodAreaAndNavigate(orgManageLocationsUrls.add.linkLocationToContacts)

  return (
    <ConfirmLocationLayout
      navigateToNextPage={navigateToNextPage}
      layoutType='shape'
    />
  )
}
