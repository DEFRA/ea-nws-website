import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import LocationNotNearDangerLayout from '../../../layouts/location/LocationNotNearDangerLayout'

export default function LocationNotNearDangerPage () {
  const navigate = useNavigate()

  const continueToSearchResultsPage = () => {
    navigate('/manage-locations/add/search')
  }

  return (
    <>
      <Helmet>
        <title>You Cannot Get Flood Messages - Next Warning Service GOV.UK</title>
      </Helmet>
      <LocationNotNearDangerLayout
        continueToSearchResultsPage={continueToSearchResultsPage}
      />
    </>
  )
}
