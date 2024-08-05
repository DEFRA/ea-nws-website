import { useNavigate } from 'react-router-dom'
import LocationInSevereWarningAreaLayout from '../../../common-layouts/location/LocationInSevereWarningAreaLayout'

export default function LocationInSevereWarningAreaPage () {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/manage-locations/add/location-in-alert-area')
  }

  return (
    <>
      <LocationInSevereWarningAreaLayout
        continueToNextPage={continueToNextPage}
      />
    </>
  )
}
