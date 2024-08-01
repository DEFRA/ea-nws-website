import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LocationInSevereWarningAreaLayout from '../../../layouts/location/LocationInSevereWarningAreaLayout'

export default function LocationInSevereWarningAreaPage () {
  const navigate = useNavigate()
  const additionalAlerts = useSelector(
    (state) => state.session.additionalAlerts
  )
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  const continueToNextPage = () => {
    if (additionalAlerts) {
      navigate('/manage-locations/add/location-in-alert-area')
    } else {
      navigate('/home', {
        state: {
          locationName: selectedLocation.name
        }
      })
    }
  }

  return (
    <>
      <LocationInSevereWarningAreaLayout
        continueToNextPage={continueToNextPage}
      />
    </>
  )
}
