import { React } from 'react'
import ConfirmLocationLayout from '../../../../../layouts/location/manual-add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { useNavigate, useLocation } from 'react-router'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'
export default function ConfirmLocationPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const isUserAddingLocation = !!location.pathname.includes('add')

  return (
    <>
      <ConfirmLocationLayout
        differentXyCoordinates={isUserAddingLocation ? navigate(orgManageLocationsUrls.search.xyCoordinatesSearch) : navigate(orgManageLocationsUrls.edit.xyCoordinatesSearch)}
      />
    </>
  )
}
