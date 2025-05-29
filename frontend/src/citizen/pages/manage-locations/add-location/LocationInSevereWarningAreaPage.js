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
        <title>You can get severe flood warnings and flood warnings near this area - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationInSevereWarningAreaLayout
        continueToNextPage={continueToNextPage}
      />
    </>
  )
}
