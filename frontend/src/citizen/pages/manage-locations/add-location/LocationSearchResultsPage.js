import { useNavigate } from 'react-router-dom'
import LocationSearchResultsLayout from '../../../layouts/location/LocationSearchResultsLayout'

export default function LocationSearchResultsPage() {
  const navigate = useNavigate()

  const continueToNextPage = (
    floodAreasAlreadyAdded,
    isInWarningArea,
    isInAlertArea,
    isWithinWarningAreaProximity,
    isWithinAlertAreaProximity,
    isError
  ) => {
    if (floodAreasAlreadyAdded.length > 0) {
      navigate('/manage-locations/add/location-already-added')
    } else if (isWithinWarningAreaProximity || isWithinAlertAreaProximity) {
      navigate('/manage-locations/add/location-near-flood-areas')
    } else if (isInWarningArea || isInAlertArea) {
      navigate('/manage-locations/add/location-in-flood-areas')
    } else if (isError) {
      navigate('/error')
    } else {
      navigate('/manage-locations/add/no-danger')
    }
  }

  const returnToSearchPage = '/manage-locations/add/search'

  return (
    <>
      <LocationSearchResultsLayout
        continueToNextPage={continueToNextPage}
        returnToSearchPage={returnToSearchPage}
      />
    </>
  )
}
