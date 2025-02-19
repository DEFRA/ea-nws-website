import { React } from 'react'
import { useNavigate } from 'react-router'
import ConfirmLocationLayout from '../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
export default function ConfirmShapefilePolygonPage () {
  const navigate = useNavigate()

  // TODO: Update this to navigate to next page in flow, once it's created
  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation)
  }

  return (
    <ConfirmLocationLayout
      navigateToNextPage={navigateToNextPage}
      layoutType='shape'
    />
  )
}
