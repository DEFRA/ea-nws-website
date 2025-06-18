import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import InsetText from '../../../common/components/gov-uk/InsetText'
import { backendCall } from '../../../common/services/BackendService'

export default function LocationAlreadyAddedLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profileLocations = useSelector((state) => state.session.profile.pois)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const [severeWarningAreaNames, setSevereWarningAreaNames] = useState(
    new Set()
  )
  const [alertAreaNames, setAlertAreaNames] = useState(new Set())
  const [allFloodAreasAdded, setAllFloodAreasAdded] = useState(false)
  const locationSearchType = useSelector(
    (state) => state.session.locationSearchType
  )
  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId() {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  useEffect(() => {
    async function fetchFloodAreasAlreadyAdded() {
      const { alertArea, warningArea } = await getSurroundingFloodAreas(
        latitude,
        longitude,
        locationSearchType === 'placename' ? 1.5 : 0.5
      )

      const floodAreas = alertArea?.features.concat(warningArea?.features)

      let severeNames = new Set()
      let alertNames = new Set()

      floodAreas?.forEach((area) => {
        const alreadyAdded = profileLocations.some((loc) => {
          loc.address === area.properties.TA_Name
        })

        if (alreadyAdded) {
          if (area.properties.category.toLowerCase().includes('warning')) {
            severeNames.add(area.properties.TA_Name)
          } else if (area.properties.category.toLowerCase().includes('alert')) {
            alertNames.add(area.properties.TA_Name)
          }
        }
      })

      const alreadyAddedSize = [...severeNames].length + [...alertNames].length

      if (alreadyAddedSize === floodAreas.size) {
        // user gets all available flood areas for this location
        setAllFloodAreasAdded(true)
      }

      setSevereWarningAreaNames(severeNames)
      setAlertAreaNames(alertNames)
    }
    fetchFloodAreasAlreadyAdded()
  }, [floodAreas])

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>
              You already get all available flood messages for this location
            </h1>
            <InsetText text={'address here'} />
            {severeWarningAreaNames.length > 0 && (
              <>
                <h2 class='govuk-heading-m'>
                  Severe warnings and flood warnings
                </h2>
                <ul class='govuk-list govuk-list--bullet'>
                  {severeWarningAreaNames.map((name) => {
                    return <li>{name}</li>
                  })}
                </ul>
              </>
            )}
            {alertAreaNames.length > 0 && (
              <>
                <h2 class='govuk-heading-m'>Flood alerts</h2>
                <p>You already get these for:</p>
                <ul class='govuk-list govuk-list--bullet'>
                  {alertAreaNames.map((name) => {
                    return <li>{name}</li>
                  })}
                </ul>
              </>
            )}
            <div className='govuk-!-margin-top-7'>
              <Button
                text='Choose different location'
                className='govuk-button'
                onClick={() => navigate(-1)}
              />
              &nbsp; &nbsp;
              <Link
                onClick={() => navigate(-1)}
                className='govuk-link'
                style={{
                  display: 'inline-block',
                  padding: '8px 10px 7px',
                  cursor: 'pointer'
                }}
              >
                Choose different location
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
