import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LocationInAlertAreaLayout from '../../../common-layouts/location/LocationInAlertAreaLayout'

export default function LocationInAlertAreaPage() {
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  // only used when user is going through nearby target areas flow
  const isUserInNearbyTargetFlowpath = useSelector(
    (state) => state.session.nearbyTargetAreaFlow
  )
  const selectedFloodWarningArea = useSelector(
    (state) => state.session.selectedFloodWarningArea
  )
  const selectedFloodAlertArea = useSelector(
    (state) => state.session.selectedFloodAlertArea
  )

  console.log()

  const continueToNextPage = () => {
    let name
    if (isUserInNearbyTargetFlowpath) {
      name =
        (selectedFloodWarningArea
          ? 'Warning area - ' + selectedFloodWarningArea?.properties.ta_name
          : '') +
        '\n\n' +
        (selectedFloodAlertArea
          ? 'Alert area - ' + selectedFloodAlertArea?.properties.ta_name
          : '')
    } else {
      name = selectedLocation.name
    }

    navigate('/home', {
      state: {
        locationName: name
      }
    })
  }

  return (
    <>
      <LocationInAlertAreaLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
