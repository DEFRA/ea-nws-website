import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import LocationInSevereWarningAreaLayout from '../../../layouts/location/LocationInSevereWarningAreaLayout'

export default function LocationInSevereWarningAreaPage () {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/manage-locations/add/location-in-alert-area')
  }

  return (
    <>
      <Helmet>
        <title>You Can Get Flood Warnings for This Location - Next Warning Service GOV.UK</title>
      </Helmet>
      <LocationInSevereWarningAreaLayout
        continueToNextPage={continueToNextPage}
      />
    </>
  )
}
