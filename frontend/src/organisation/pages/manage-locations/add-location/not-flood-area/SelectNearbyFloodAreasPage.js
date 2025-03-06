import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import LinkLocationsLayout from '../../../../layouts/location/link-locations/LinkLocationsLayout'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function SelectNearbyFloodAreasPage () {
  const navigate = useNavigate()

  const orgId = useSelector((state) => state.session.orgId)

  const navigateToNextPage = async () => {
    const dataToSend = { orgId }
    const { data } = await backendCall(
      dataToSend,
      'api/elasticache/list_contacts',
      navigate
    )
    navigate(orgManageLocationsUrls.add.linkLocationToContacts)
  }

  const navigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <>
      <LinkLocationsLayout
        navigateToPreviousPage={navigateToPreviousPage}
        navigateToNextPage={navigateToNextPage}
      />
    </>
  )
}
