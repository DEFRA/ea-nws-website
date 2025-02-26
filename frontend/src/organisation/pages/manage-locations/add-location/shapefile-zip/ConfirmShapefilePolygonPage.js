import { React } from 'react'
import ConfirmLocationLayout from '../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { useVerifyLocationInFloodArea } from '../not-flood-area/verfiyLocationInFloodAreaAndNavigate'

export default async function ConfirmShapefilePolygonPage() {
  const verifyLocationInFloodAreaAndNavigate = useVerifyLocationInFloodArea()

  //update below to navigate to contact linking pages
  const navigateToNextPage = await verifyLocationInFloodAreaAndNavigate(
    orgManageLocationsUrls.view.viewLocation
  )

  return (
    <ConfirmLocationLayout
      navigateToNextPage={navigateToNextPage}
      layoutType='shape'
    />
  )
}
