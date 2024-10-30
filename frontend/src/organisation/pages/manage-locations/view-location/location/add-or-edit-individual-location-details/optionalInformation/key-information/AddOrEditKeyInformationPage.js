import { useNavigate } from 'react-router-dom'
import KeyInformationLayout from '../../../../../../../layouts/location/add-or-edit-location/optional-information/KeyInformationLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddOrEditKeyInformationPage() {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.individualLocation.view)
  }

  return (
    <>
      <KeyInformationLayout
        flow={'edit'}
        navigateToNextPage={navigateToNextPage}
      />
    </>
  )
}
