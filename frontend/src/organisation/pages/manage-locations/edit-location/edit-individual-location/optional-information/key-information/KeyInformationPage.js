import { useNavigate } from 'react-router-dom'
import KeyInformationLayout from '../../../../../../layouts/optional-info/KeyInformationLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function KeyInformationPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (locationName) => {
    // If user has updated the location name, we require it here
    navigate(orgManageLocationsUrls.view.individualLocation, {
      state: { successMessage: `${locationName} key information changed` }
    })
  }

  return (
    <>
      <KeyInformationLayout
        flow='edit'
        navigateToNextPage={navigateToNextPage}
      />
    </>
  )
}
