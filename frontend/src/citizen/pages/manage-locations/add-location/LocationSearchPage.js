import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import LocationSearchLayout from '../../../layouts/location/LocationSearchLayout'

export default function LocationSearchPage () {
  const navigate = useNavigate()

  const continueToNextPage = () => {
    navigate('/manage-locations/add/search-results')
  }

  return (
    <>
      <Helmet>
        <title>Check if you can get flood messages for your location - Who are the flood warnings for? - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationSearchLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
