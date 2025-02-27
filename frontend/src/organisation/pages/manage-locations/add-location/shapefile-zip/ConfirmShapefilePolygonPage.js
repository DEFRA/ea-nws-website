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

  let nextPage = ''

  const dataToSend = { orgId }
  const { data } = await backendCall(
    dataToSend,
    'api/elasticache/list_contacts',
    navigate
  )
  if (data && data.length > 0) {
    nextPage = orgManageLocationsUrls.add.linkLocationToContacts
  } else {
    nextPage = orgManageLocationsUrls.add.addContacts
  }

  const navigateToNextPage = await verifyLocationInFloodAreaAndNavigate(nextPage)

  return (
    <ConfirmLocationLayout
      navigateToNextPage={navigateToNextPage}
      layoutType='shape'
    />
  )
}
