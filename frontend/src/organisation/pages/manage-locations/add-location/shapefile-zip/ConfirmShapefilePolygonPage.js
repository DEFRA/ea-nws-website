import { React } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ConfirmLocationLayout from '../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { useVerifyLocationInFloodArea } from '../not-flood-area/verfiyLocationInFloodAreaAndNavigate'
import { backendCall } from '../../../../../common/services/BackendService'

export default async function ConfirmShapefilePolygonPage () {
  const navigate = useNavigate()
  const verifyLocationInFloodAreaAndNavigate = useVerifyLocationInFloodArea()
  const orgId = useSelector((state) => state.session.orgId)

  const dataToSend = { orgId }
  const { data } = await backendCall(
    dataToSend,
    'api/elasticache/list_contacts',
    navigate
  )

  const navigateToNextPage = await verifyLocationInFloodAreaAndNavigate(orgManageLocationsUrls.add.linkLocationToContacts)

  return (
    <ConfirmLocationLayout
      navigateToNextPage={navigateToNextPage}
      layoutType='shape'
    />
  )
}
