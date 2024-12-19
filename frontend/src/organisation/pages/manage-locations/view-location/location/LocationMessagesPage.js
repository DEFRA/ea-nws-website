import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import linkIcon from '../../../../../common/assets/images/link.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../../../common/components/gov-uk/Radio'
import AlertType from '../../../../../common/enums/AlertType'
import { getLocationAdditionals, setCurrentLocationAlertTypes } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { csvToJson } from '../../../../../common/services/CsvToJson'
import { getSurroundingFloodAreas } from '../../../../../common/services/WfsFloodDataService'
import { infoUrls } from '../../../../routes/info/InfoRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import LocationHeader from './location-information-components/LocationHeader'
export default function LocationMessagesPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isBannerDisplayed, setIsBannerDisplayed] = useState(false)
  const additionalData = useSelector(
    (state) => getLocationAdditionals(state)
  )
  const [loading, setLoading] = useState(true)
  const { latitude, longitude } = useSelector(
    (state) => state.session.currentLocation.coordinates
  )
  const [alertAreas, setAlertAreas] = useState(null)
  const [warningAreas, setWarningAreas] = useState(null)
  const [floodAreasInputs, setFloodAreasInputs] = useState([])
  const [floodHistoryData, setFloodHistoryData] = useState(null)
  const [floodAlertsCount, setFloodAlertsCount] = useState([])
  const [severeFloodWarningsCount, setSevereFloodWarningsCount] = useState([])
  const alertTypes = additionalData.alertTypes
  const allAlertTypes = [AlertType.SEVERE_FLOOD_WARNING, AlertType.FLOOD_WARNING, AlertType.FLOOD_ALERT]

  const [alertTypesEnabled, setAlertTypesEnabled] = useState([
    alertTypes?.includes(allAlertTypes[0]),
    alertTypes?.includes(allAlertTypes[1]),
    alertTypes?.includes(allAlertTypes[2])
  ])

  const alertTypesEnabledOriginal = [
    alertTypes?.includes(allAlertTypes[0]),
    alertTypes?.includes(allAlertTypes[1]),
    alertTypes?.includes(allAlertTypes[2])
  ]

  const messageSettings = [
    'Severe flood warnings',
    'Flood warnings',
    'Flood alerts'
  ]

  const surroundingAreas = async () => {
    const { alertArea, warningArea } = await getSurroundingFloodAreas(
      latitude, longitude,
      0.5
    )
    setAlertAreas(alertArea)
    setWarningAreas(warningArea)
  }

  useEffect(() => {
    const fetchAreas = async () => {
      await surroundingAreas()
    }
    fetchAreas()
  }, [])

  useEffect(() => {
    if (alertAreas || warningAreas) {
      populateInputs(alertAreas?.features, warningAreas?.features)
    }

  }, [alertAreas, warningAreas])

  useEffect(() => {
    const setHistoricalAlertNumber = (alertArea) => {
      const oneYearAgo = moment().subtract(1, 'years')
      if (alertArea) {
        const taCodes = alertArea.properties.FWS_TACODE

        const filteredAlert = floodHistoryData
          .filter(({ CODE }) => taCodes.includes(CODE))
          .filter((inDate) => moment(inDate.DATE, 'DD/MM/YYYY') > oneYearAgo)

        setFloodAlertsCount(prevState => [...prevState, filteredAlert.length])
      }
    }

    const setHistoricalWarningNumber = (warningArea) => {
      const oneYearAgo = moment().subtract(1, 'years')

      if (warningArea) {
        const taCodes = warningArea.properties.FWS_TACODE
        
        const filteredWarning = floodHistoryData
          .filter(({ CODE }) => taCodes.includes(CODE))
          .filter((inDate) => moment(inDate.DATE, 'DD/MM/YYYY') > oneYearAgo)

        setSevereFloodWarningsCount(prevState => [...prevState, filteredWarning.length])
      }
    }

    async function getHistoryUrl () {
      const { data } = await backendCall(
        'data',
        'api/locations/download_flood_history'
      )

      data &&
        fetch(data)
          .then((response) => response.text())
          .then((data) => {
            setFloodHistoryData(csvToJson(data))
          })
          .catch((e) =>
            console.error('Could not fetch Historic Flood Warning file', e)
          )
    }

    async function processFloodHist () {
      await getHistoryUrl()

      if (floodHistoryData) {
        if (alertAreas) {
          alertAreas.features.forEach((area) => setHistoricalAlertNumber(area))
        }
        if (warningAreas) {
          warningAreas.features.forEach((area) => setHistoricalWarningNumber(area))
        }
      }
    }
    processFloodHist()
    setLoading(false)
  }, [alertAreas, floodHistoryData, warningAreas])


  const populateInputs = (alertAreas, warningAreas) => {
    const updatedFloodAreas = []
    if (alertAreas) {
      for(var i = 0; i < alertAreas.length; i++){
        updatedFloodAreas.push({
          areaName:
          alertAreas[i].properties.TA_NAME,
          areaType: 'Flood alert',
          messagesSent: `${floodAlertsCount[i]} flood alert${floodAlertsCount[i]>1? 's' : ''}`
        })

    }
    if (warningAreas) {
      for(var i = 0; i < warningAreas.length; i++){
        updatedFloodAreas.push({
          areaName:
          warningAreas[i].properties.TA_NAME,
          areaType: 'Severe and flood warning',
          messagesSent: `${severeFloodWarningsCount[i]} severe flood warning${severeFloodWarningsCount[i]>1 ? 's' : ''} and flood warning${severeFloodWarningsCount[i]>1 ? 's' : ''}`
        })
      }
    }
    setFloodAreasInputs(updatedFloodAreas)
  }}

  const handleSumbit = () => {
    if (
      alertTypesEnabledOriginal.every(
        (value, index) => value === alertTypesEnabled[index]
      )
    ) {
      return null
    } else {
      setIsBannerDisplayed(true)

      const alertTypesDispatch = []
      alertTypesEnabled.forEach((enabled, index) => {
        if (enabled) alertTypesDispatch.push(allAlertTypes[index])
      })

      if (alertTypesDispatch.length > 0) {
        dispatch(setCurrentLocationAlertTypes(alertTypesDispatch))
      }
    }
  }

  const handleChangeRadio = (index, value) => {
    const newalertTypesEnabled = [...alertTypesEnabled]
    newalertTypesEnabled[index] = value
    setAlertTypesEnabled(newalertTypesEnabled)
    setIsBannerDisplayed(false)
  }

  const messageSettingsSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Message settings
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      {alertTypes
        ? (
          <p>
            You can choose which flood messages to get for each location if
            they're available.
            <br />
          </p>
          )
        : (
          <>
            <p>
              Flood messages are currently unavailable for this location. This may
              be because there are no measurement guages in the area of the
              location. Or the location is in an area where not many people live
              or work.
            </p>
            <p>
              But you may be able to link this location to any nearby flood areas
              that can get flood messages in the Flood areas section.
            </p>
            <p>
              And if any flood messages become available for this location in the
              future we'll automatically send them to you. You can then customise
              by choosing which flood messages to get.
            </p>
          </>
          )}
      <p>
        <Link to={infoUrls.floodTypes} className='govuk-link'>
          What are the different types of flood messages?
        </Link>
      </p>
      <br />

      <table className='govuk-table govuk-table--small-text-until-tablet'>
        <tbody className='govuk-table__body'>
          {messageSettings.map((message, index) => (
            <tr className='govuk-table__row' key={index}>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                <strong>{message}</strong>
              </td>
              {alertTypes
                ? (
                  <>
                    <td className='govuk-table__cell'>
                      <Radio
                        label='On'
                        small
                        value={'Radio_On_' + index}
                        name={'Radio_' + index}
                        checked={alertTypesEnabled[index]}
                        onChange={() => handleChangeRadio(index, true)}
                      />
                    </td>
                    <td className='govuk-table__cell'>
                      <Radio
                        label='Off'
                        small
                        value={'Radio_Off_' + index}
                        name={'Radio_' + index}
                        checked={!alertTypesEnabled[index]}
                        onChange={() => handleChangeRadio(index, false)}
                      />
                    </td>
                  </>
                  )
                : (
                  <td
                    className='govuk-table__cell'
                    style={{ textAlign: 'right', lineHeight: '50px' }}
                  >
                    Unavailable
                  </td>
                  )}
            </tr>
          ))}
        </tbody>
      </table>

      {alertTypes && (
        <Button
          text='Save message settings'
          className='govuk-button'
          onClick={handleSumbit}
        />
      )}
    </>
  )

  const floodAreasSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Flood areas
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      {loading ? (<LoadingSpinner />)
        : <>
          {floodAreasInputs.length > 0
            ? (
              <p>
                {additionalData.locationName} can get flood messages for these areas.
                You may be also able to link {additionalData.locationName} to nearby
                flood areas that get flood messages.
              </p>
              )
            : (
              <p>
                Flood messages are currently unavailable for this location.
                But you may be able to link this location to any nearby flood areas
                that can get flood messages.
              </p>
              )}
          <br />
          <p>
            <Link to={infoUrls.floodAreas} className='govuk-link'>
              What are flood areas?
            </Link>
          </p>
          <br />

          {floodAreasInputs.length > 0 &&

         (
           <>
             <span class='govuk-caption-m'>
               {floodAreasInputs.length} flood areas
             </span>

             <table className='govuk-table govuk-table--small-text-until-tablet'>
               <thead className='govuk-table__head'>
                 <tr className='govuk-table__row'>
                   <th scope='col' className='govuk-table__header'>
                     Area name
                   </th>
                   <th scope='col' className='govuk-table__header'>
                     Area type
                   </th>
                   <th scope='col' className='govuk-table__header'>
                     Total messages sent in the
                     <br /> last 2 years
                   </th>
                   <th scope='col' className='govuk-table__header' />
                 </tr>
               </thead>
               <tbody className='govuk-table__body'>
                 {floodAreasInputs.map((detail, index) => (
                   <tr key={index} className='govuk-table__row'>
                     <td
                       className='govuk-table__cell'
                       style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                     >
                       <Link to='/' className='govuk-link'>
                         {detail.areaName}
                       </Link>
                     </td>
                     <td
                       className='govuk-table__cell'
                       style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                     >
                       {/* TODO: Add link icon if location is already linked */}
                       {/* <img
                      src={linkIcon}
                      alt='Link icon'
                      style={{ marginRight: '10px' }}
                    /> */}
                       {detail.areaType}
                     </td>
                     <td
                       className='govuk-table__cell'
                       style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                     >
                       {detail.messagesSent}
                     </td>
                     <td
                       className='govuk-table__cell'
                       style={{ verticalAlign: 'middle', padding: '1.5rem 0rem' }}
                     >
                       {detail.areaType === 'Flood alert'
                         ? (
                           <Link className='govuk-link'>Unlink</Link>
                           )
                         : null}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </>
         )}
          </>}

      <Button
        imageSrc={linkIcon}
        text='Link to nearby flood areas'
        className='govuk-button govuk-button--secondary'
        // TODO: Add link to nearby flood areas
        onClick={() => navigate('/')}
      />
    </>
  )

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(orgManageLocationsUrls.view.dashboard)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-0'>
        {isBannerDisplayed && (
          <NotificationBanner
            className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-8'
            title='Success'
            text={
              'Message settings for ' +
              additionalData.locationName +
              ' updated'
            }
          />
        )}
        <LocationHeader
          currentPage={orgManageLocationsUrls.view.viewMessages}
        />

        {/* details */}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {messageSettingsSection}
          </div>
        </div>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-!-margin-top-9'>
            {floodAreasSection}
          </div>
        </div>
      </main>
    </>
  )
}
