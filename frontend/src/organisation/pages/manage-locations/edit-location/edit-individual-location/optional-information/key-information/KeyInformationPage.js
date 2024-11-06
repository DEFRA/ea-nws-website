import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import KeyInformationLayout from '../../../../../../layouts/optional-info/KeyInformationLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function KeyInformationPage () {
  const navigate = useNavigate()
  const locationName = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.location_name
  )

  const navigateToNextPage = () => {
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
