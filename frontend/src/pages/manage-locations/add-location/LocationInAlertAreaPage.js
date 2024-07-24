import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LocationInAlertAreaLayout from '../../../common-layouts/location/LocationInAlertAreaLayout'

export default function LocationInAlertAreaPage() {
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  const continueToNextPage = () => {
    navigate('/home', {
      state: {
        locationName: selectedLocation.name
      }
    })
  }

  return (
    <>
      <LocationInAlertAreaLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
