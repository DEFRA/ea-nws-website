import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import InsetText from '../../../common/components/gov-uk/InsetText'
import { setNearbyTargetAreasFlow } from '../../../common/redux/userSlice'
import { getSurroundingFloodAreas } from '../../../common/services/WfsFloodDataService'

export default function LocationAlreadyAddedLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const [severeWarningAreaNames, setSevereWarningAreaNames] = useState([])
  const [alertAreaNames, setAlertAreaNames] = useState([])
  const [moreFloodAreasAvailable, setMoreFloodAreasAvailable] = useState(false)
  const [loading, setLoading] = useState(true)
  const locationSearchType = useSelector(
    (state) => state.session.locationSearchType
  )
  const floodAreasAlreadyAdded = useSelector(
    (state) => state.session.floodAreasAlreadyAdded
  )

  useEffect(() => {
    async function fetchFloodAreasAlreadyAdded() {
      const { alertArea, warningArea } = await getSurroundingFloodAreas(
        selectedLocation.coordinates.latitude,
        selectedLocation.coordinates.longitude,
        locationSearchType === 'placename' ? 1.5 : 0.5
      )

      let alertAreas = []
      alertArea?.features?.forEach((area) => {
        if (floodAreasAlreadyAdded.includes(area?.properties.TA_Name)) {
          alertAreas.push(area?.properties.TA_Name)
        }
      })

      let severeAreas = []
      warningArea?.features?.forEach((area) => {
        if (floodAreasAlreadyAdded.includes(area?.properties.TA_Name)) {
          severeAreas.push(area?.properties.TA_Name)
        }
      })

      setMoreFloodAreasAvailable(
        floodAreasAlreadyAdded.length <
          warningArea?.features?.length + alertArea?.features?.length
      )
      setSevereWarningAreaNames(severeAreas)
      setAlertAreaNames(alertAreas)
      setLoading(false)
    }
    fetchFloodAreasAlreadyAdded()
  }, [])

  const navigateToNextPage = () => {
    if (moreFloodAreasAvailable) {
      dispatch(setNearbyTargetAreasFlow(true))
      navigate('/manage-locations/add/location-near-flood-areas')
    } else {
      navigate(-1)
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-full'>
            {!loading && (
              <>
                <h1 className='govuk-heading-l'>
                  {moreFloodAreasAvailable
                    ? 'You already get some flood messages for this location'
                    : 'You already get all available flood messages for this location'}
                </h1>
                <InsetText text={selectedLocation.address} />
                {severeWarningAreaNames.length > 0 && (
                  <>
                    <h2 className='govuk-heading-m'>
                      Severe warnings and flood warnings
                    </h2>
                    <ul className='govuk-list govuk-list--bullet'>
                      {severeWarningAreaNames.map((name, index) => {
                        return <li key={index}>{name}</li>
                      })}
                    </ul>
                  </>
                )}
                {alertAreaNames.length > 0 && (
                  <>
                    <h2 className='govuk-heading-m'>Flood alerts</h2>
                    <p>You already get these for:</p>
                    <ul className='govuk-list govuk-list--bullet'>
                      {alertAreaNames.map((name, index) => {
                        return <li key={index}>{name}</li>
                      })}
                    </ul>
                  </>
                )}
                {moreFloodAreasAvailable && (
                  <h2 className='govuk-heading-m'>
                    There are other nearby areas you can add
                  </h2>
                )}
                <div className='govuk-!-margin-top-7'>
                  <Button
                    text={
                      moreFloodAreasAvailable
                        ? 'View other nearby areas'
                        : 'Choose different location'
                    }
                    className='govuk-button'
                    onClick={() => navigateToNextPage()}
                  />
                  {moreFloodAreasAvailable && (
                    <>
                      &nbsp; &nbsp;
                      <Button
                        text='Choose different location'
                        className='govuk-button  govuk-button--secondary'
                        onClick={() => navigate(-1)}
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
