import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import ButtonMenu from '../../../../../common/components/custom/ButtonMenu'
import Popup from '../../../../../common/components/custom/Popup'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import AlertType from '../../../../../common/enums/AlertType'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import RiskAreaType from '../../../../../common/enums/RiskAreaType'
import { setCurrentLocation } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { geoSafeToWebLocation, webToGeoSafeLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { setLocationAlertTypeOrg } from '../../../../../common/services/ProfileServices'
import {
  getGroundwaterFloodRiskRatingOfLocation,
  getRiversAndSeaFloodRiskRatingOfLocation,
  getSurroundingFloodAreas,
  isLocationInFloodArea
} from '../../../../../common/services/WfsFloodDataService'
import LocationsTable from '../../../../components/custom/LocationsTable'
import { riskData } from '../../../../components/custom/RiskCategoryLabel'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import DashboardHeader from './dashboard-components/DashboardHeader'
import SearchFilter from './dashboard-components/SearchFilter'

export default function ViewLocationsDashboardPage () {
  const [locations, setLocations] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const [notificationText, setNotificationText] = useState(
    location.state?.successMessage
  )
  const [selectedLocations, setSelectedLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [targetLocation, setTargetLocation] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const [holdPage, setHoldPage] = useState(0)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [displayedLocations, setDisplayedLocations] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([])
  const [unavailableLocationsIds, setUnavailableLocationsIds] = useState([])
  const [alertOnlyLocationsIds, setAlertOnlyLocationsIds] = useState([])
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const [dialog, setDialog] = useState({
    show: false,
    text: '',
    title: '',
    buttonText: '',
    buttonClass: '',
    input: '',
    charLimit: 0,
    error: '',
    options: []
  })

  const locationsPerPage = 20

  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId () {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    setFilteredLocations(locations)
  }, [locations])

  useEffect(() => {
    setCurrentPage(1)
    setSelectedLocations([])
  }, [resetPaging])

  useEffect(() => {
    setDisplayedLocations(
      filteredLocations.slice(
        (currentPage - 1) * locationsPerPage,
        currentPage * locationsPerPage
      )
    )
  }, [filteredLocations, currentPage])

  useEffect(() => {
    const getLocations = async () => {
      const dataToSend = { orgId }
      const { data } = await backendCall(
        dataToSend,
        'api/elasticache/list_locations',
        navigate
      )

      const locationsUpdate = []
      if (data) {
        data.forEach((location) => {
          locationsUpdate.push(geoSafeToWebLocation(location))
        })
      }

      const riverSeaRisks = await Promise.all(
        locationsUpdate.map((location) =>
          getRiskCategory({
            riskAreaType: RiskAreaType.RIVERS_AND_SEA,
            location
          })
        )
      )
      const groundWaterRisks = await Promise.all(
        locationsUpdate.map((location) =>
          getRiskCategory({
            riskAreaType: RiskAreaType.GROUNDWATER,
            location
          })
        )
      )

      locationsUpdate.forEach(function (location, idx) {
        location.riverSeaRisk = riverSeaRisks[idx]
        location.groundWaterRisk = groundWaterRisks[idx]
      })

      locationsUpdate.forEach(async function (location, idx) {
        const contactsDataToSend = { authToken, orgId, location }
        const { data } = await backendCall(
          contactsDataToSend,
          'api/elasticache/list_linked_contacts',
          navigate
        )

        location.linked_contacts = []
        if (data) {
          data.forEach((contact) => {
            location.linked_contacts.push(contact.id)
          })
        }
      })

      setLocations(locationsUpdate)
      setFilteredLocations(locationsUpdate)
    }

    getPartnerId()
    getLocations()
  }, [])

  const getRiskCategory = async ({ riskAreaType, location }) => {
    let riskCategory = null

    if (
      (location.additionals.other?.location_data_type !==
        LocationDataType.ADDRESS &&
        location.additionals.other?.location_data_type !==
          LocationDataType.X_AND_Y_COORDS) ||
      location.coordinates === null ||
      location.coordinates.latitude === null ||
      location.coordinates.longtitude === null
    ) {
      return null
    }

    if (riskAreaType === RiskAreaType.RIVERS_AND_SEA) {
      riskCategory = await getRiversAndSeaFloodRiskRatingOfLocation(
        location.coordinates.latitude,
        location.coordinates.longitude
      )
    } else if (riskAreaType === RiskAreaType.GROUNDWATER) {
      riskCategory = await getGroundwaterFloodRiskRatingOfLocation(
        location.coordinates.latitude,
        location.coordinates.longitude
      )
    }

    return riskData[riskCategory]
  }

  const moreActions = [
    'Link selected to contacts',
    'Update selected message settings',
    'Delete selected'
  ]

  // selected filters
  const [selectedLocationTypeFilters, setSelectedLocationTypeFilters] =
    useState([])
  const [
    selectedFloodMessagesAvailableFilters,
    setSelectedFloodMessagesAvailableFilters
  ] = useState([])
  const [
    selectedFloodMessagesSentFilters,
    setSelectedFloodMessagesSentFilters
  ] = useState([])
  const [
    selectedBusinessCriticalityFilters,
    setSelectedBusinessCriticalityFilters
  ] = useState([])
  const [selectedRiverSeaRiskFilters, setSelectedRiverSeaRiskFilters] =
    useState([])
  const [selectedGroundWaterRiskFilters, setSelectedGroundWaterRiskFilters] =
    useState([])
  const [selectedKeywordFilters, setSelectedKeywordFilters] = useState([])
  const [selectedLinkedFilters, setSelectedLinkedFilters] = useState([])

  const deleteLocationsText = (locationsToBeDeleted) => {
    let text = ''

    if (locationsToBeDeleted.length > 1) {
      text =
        locationsToBeDeleted.length +
        ' ' +
        (selectedLocations.length > 1 ? 'locations' : 'location')
    } else {
      text = locationsToBeDeleted[0].additionals.locationName
    }

    return text
  }

  const editLocationText = (locationsToBeEdited) => {
    const unavailableLocationsCount = unavailableLocationsIds.length
    const alertOnlyLocationsCount = alertOnlyLocationsIds.length
    const remainingLocationsCount =
      locationsToBeEdited.length - unavailableLocationsCount

    let updateText = ''
    let floodMessageAvailabilityText = ''
    let alertText = ''
    if (unavailableLocationsCount > 0) {
      floodMessageAvailabilityText = `Flood messages are unavailable for ${unavailableLocationsCount} of the ${
        locationsToBeEdited.length
      } selected. To get flood messages for these locations you may be able to link them to any nearby flood areas that get flood messages.
        Any updates will change the message settings for all ${remainingLocationsCount} location${
        remainingLocationsCount ? 's' : ''
      }.`
      alertText = `Select the type of flood messages you want the other ${remainingLocationsCount} location${
        remainingLocationsCount ? 's' : ''
      } to get.`
      if (alertOnlyLocationsCount === 0) {
        updateText = `Select the type of flood messages you want the other ${remainingLocationsCount} location${
          remainingLocationsCount ? 's' : ''
        } to get. Any updates will change the settings for all ${remainingLocationsCount} location${
          remainingLocationsCount ? 's' : ''
        } `
      }
    }
    if (alertOnlyLocationsCount > 0) {
      floodMessageAvailabilityText = `Select the type of flood messages you want for th${
        locationsToBeEdited.length > 1 ? 'ese' : 'is'
      } location${locationsToBeEdited.length > 1 ? 's' : ''} to get. `
      alertText += `${alertOnlyLocationsCount} of these locations is in a place that can only get flood alert even if severe flood warning and flood warning are selected.`
      updateText =
        'Any update will change the messages settings for all locations where those message types are available.'
    }
    if (alertOnlyLocationsCount === 0 && unavailableLocationsCount === 0) {
      floodMessageAvailabilityText = `Select the type of flood messages you want for th${
        locationsToBeEdited.length > 1 ? 'ese' : 'is'
      } ${locationsToBeEdited.length} location${
        locationsToBeEdited.length > 1 ? 's' : ''
      } to get. `
      updateText = `Any updates will change the message settings for all ${
        locationsToBeEdited.length
      } location${locationsToBeEdited.length > 1 ? 's' : ''}.`
    }
    return floodMessageAvailabilityText + ' ' + alertText + ' ' + updateText
  }

  const getSelectedLocationsInformations = async (selectedLocations) => {
    for(const location of selectedLocations){
      const { warningArea, alertArea } = await getSurroundingFloodAreas(
        location.coordinates.latitude,
        location.coordinates.longitude
      )

      const isInAlertArea =
        alertArea &&
        isLocationInFloodArea(
          location.coordinates.latitude,
          location.coordinates.longitude,
          alertArea
      )
      const isInWarningArea =
        warningArea &&
        isLocationInFloodArea(
          location.coordinates.latitude,
          location.coordinates.longitude,
          warningArea
      )

      if(!isInAlertArea && !isInWarningArea) {
        setUnavailableLocationsIds((prevState) => {
          return [...prevState, location.id]
        })
      } else if (!isInWarningArea && isInAlertArea) {
        setAlertOnlyLocationsIds((prevState) => {
          return [...prevState, location.id]
        })
      }
    }
  }

  const deleteDialog = (locationsToBeDeleted) => {
    if (locationsToBeDeleted && locationsToBeDeleted.length > 0) {
      setDialog({
        show: true,
        text: (
          <>
            If you continue {deleteLocationsText(locationsToBeDeleted)} will be
            deleted from this account and will not get flood messages.
          </>
        ),
        title: `Delete ${
          locationsToBeDeleted.length > 1 ? locationsToBeDeleted.length : ''
        } ${locationsToBeDeleted.length > 1 ? 'locations' : 'location'}`,
        buttonText: `Delete ${
          locationsToBeDeleted.length > 1 ? 'locations' : 'location'
        }`,
        buttonClass: 'govuk-button--warning'
      })
    }
  }

  const editDialog = async (locationsToBeEdited) => {
    await getSelectedLocationsInformations(locationsToBeEdited)
    if (locationsToBeEdited && locationsToBeEdited.length > 0) {
      setDialog({
        show: true,
        text: editLocationText(locationsToBeEdited),
        title: `Update message settings for ${locationsToBeEdited.length} ${
          locationsToBeEdited.length > 1 ? 'locations' : 'location'
        }`,
        buttonText: `Update message settings`,
        buttonClass: '',
        error:'',
        options: [
          {
            label: 'Severe flood warnings',
            value: AlertType.SEVERE_FLOOD_WARNING,
            sent: null
          },
          {
            label: 'Flood warnings',
            value: AlertType.FLOOD_WARNING,
            sent: null
          },
          {
            label: 'Flood alerts',
            value: AlertType.FLOOD_ALERT,
            sent: null
          }
        ]
      })
    }
  }

  const onAction = (e, action, location) => {
    setTargetLocation(location)
    if (action === 'view') {
      e.preventDefault()
      dispatch(setCurrentLocation(location))
      navigate(orgManageLocationsUrls.view.viewLocation)
    } else {
      const locationsToDelete = [location]
      deleteDialog(locationsToDelete)
    }
  }

  const linkContactsToLocations = () => {
    if (selectedLocations.length > 0) {
      const linkLocations = []
      selectedLocations.forEach((location) => {
        linkLocations.push(location.id)
      })

      if (selectedLocations.length === 1) {
        dispatch(setCurrentLocation(webToGeoSafeLocation(selectedLocations[0])))
      }

      navigate(orgManageContactsUrls.view.dashboard, {
        state: {
          linkLocations, linkSource: 'dashboard'
        }
      })
    }
  }

  const onMoreAction = (index) => {
    switch (index) {
      case 0:
        linkContactsToLocations()
        break
      case 1:
        editDialog(selectedLocations)
        break
      case 2:
        deleteDialog(selectedLocations)
        break
      default:
    }
  }

  const onClickLinked = (type) => {
    setSelectedFilters([])
    setSelectedLocationTypeFilters([])
    setSelectedBusinessCriticalityFilters([])
    setSelectedKeywordFilters([])
    setSelectedGroundWaterRiskFilters([])
    setSelectedRiverSeaRiskFilters([])
    setSelectedFloodMessagesAvailableFilters([])
    setSelectedLinkedFilters([])

    let updatedFilteredLocations = []

    if (type === 'messages') {
      updatedFilteredLocations = locations.filter(
        (location) => location.additionals.other?.alertTypes?.length > 0
      )
      setSelectedFloodMessagesAvailableFilters(['Yes'])
      setSelectedFilters(['Yes'])
    } else if (type === 'linked-locations') {
      updatedFilteredLocations = locations.filter(
        (location) =>
          location.additionals.parentID.length > 0 &&
          location.additionals.other?.alertTypes?.length > 0
      )
      setSelectedFloodMessagesAvailableFilters(['Yes'])
      setSelectedFilters(['Yes'])
    } else if (type === 'high-medium-risk') {
      updatedFilteredLocations = locations.filter(
        (location) =>
          (location.riverSeaRisk?.title === 'Medium risk' ||
            location.riverSeaRisk?.title === 'High risk') &&
          location.additionals.other?.alertTypes?.length === 0
      )
      setSelectedFloodMessagesAvailableFilters(['Yes'])
      setSelectedFilters(['Yes'])
    } else if (type === 'low-risk') {
      updatedFilteredLocations = locations.filter(
        (location) =>
          location.riverSeaRisk?.title === 'Low risk' &&
          location.additionals.other?.alertTypes?.length === 0
      )
      setSelectedFloodMessagesAvailableFilters(['Yes'])
      setSelectedFilters(['Yes'])
    } else if (type === 'no-links') {
      updatedFilteredLocations = locations.filter(
        (location) => location.linked_contacts?.length === 0
      )
      setSelectedLinkedFilters(['No'])
      setSelectedFilters(['No'])
    }

    setIsFilterVisible(true)
    setFilteredLocations([...updatedFilteredLocations])

    setResetPaging(!resetPaging)
  }

  const onOpenCloseFilter = () => {
    setHoldPage(currentPage)
    setIsFilterVisible(!isFilterVisible)
  }

  const editLocations = async (locationsToEdit) => {
    const choosenAlerts = [dialog.options[0].sent?'ALERT_LVL_1':null, dialog.options[1].sent?'ALERT_LVL_2':null, dialog.options[2].sent?'ALERT_LVL_3':null].filter(message => message !== null)
    const updatedLocations = [...locationsToEdit]
    for(let i = 0; i < locationsToEdit.length; i++){
      if(unavailableLocationsIds.includes(locationsToEdit[i])) continue
      if(!alertOnlyLocationsIds.includes(locationsToEdit[i].id)){
        updatedLocations[i].additionals = setLocationAlertTypeOrg(
          updatedLocations[i].additionals,
          choosenAlerts
        )
      }
      else if(alertOnlyLocationsIds.includes(locationsToEdit.id)){
        updatedLocations[i].additionals = setLocationAlertTypeOrg(
          updatedLocations[i].additionals,
          choosenAlerts.includes('ALERT_LVL_3')?['ALERT_LVL_3']:[]
        )
      }
    }

    for(let i = 0; i < updatedLocations.length; i++){
      const updateData = { authToken, orgId, location: webToGeoSafeLocation(updatedLocations[i]) }
      await backendCall(updateData, 'api/location/update', navigate)

      const registerData = {
        authToken,
        locationId: updatedLocations[i].id,
        partnerId,
        params: {
          channelVoiceEnabled: true,
          channelSmsEnabled: true,
          channelEmailEnabled: true,
          channelMobileAppEnabled: true,
          partnerCanView: true,
          partnerCanEdit: true,
          alertTypes: choosenAlerts
        }
      }

      await backendCall(
        registerData,
        'api/location/update_registration',
        navigate
      )
    }

    setDialog({ ...dialog, show: false })
  }

  const handleRadioChange = (index, isItOn) => {    
    setDialog(prevDialog => {
      const updatedDialog = {...prevDialog}
      updatedDialog.options = [...prevDialog.options]
      updatedDialog.options[index] = {
        ...updatedDialog.options[index],
        sent: isItOn
      }
      return updatedDialog
    })
  }

  const removeLocations = async (locationsToRemove) => {
    const updatedLocations = locations.filter(
      (location) => !locationsToRemove.includes(location)
    )
    const updatedFilteredLocations = filteredLocations.filter(
      (location) => !locationsToRemove.includes(location)
    )

    const locationIds = []
    locationsToRemove.forEach((location) => {
      locationIds.push(location.id)
    })

    const dataToSend = { authToken, orgId, locationIds }

    const { errorMessage } = await backendCall(
      dataToSend,
      'api/location/remove',
      navigate
    )
    if (errorMessage) {
      console.log(errorMessage)
    }

    setLocations([...updatedLocations])
    setFilteredLocations([...updatedFilteredLocations])

    setNotificationText(deleteLocationsText(locationsToRemove) + ' deleted')

    setDialog({ ...dialog, show: false })
    setTargetLocation(null)
    setSelectedLocations([])

    setResetPaging(!resetPaging)
  }

  const handleDelete = () => {
    if (targetLocation) {
      removeLocations([targetLocation])
      if (selectedLocations.length > 0) {
        const updatedSelectedLocations = selectedLocations.filter(
          (location) => location !== targetLocation
        )
        setSelectedLocations(updatedSelectedLocations)
      }
    } else if (selectedLocations.length > 0) {
      const locationsToRemove = [...selectedLocations]
      removeLocations(locationsToRemove)
    }
  }

  const onOnlyShowSelected = (enabled) => {
    if (enabled) {
      setFilteredLocations(selectedLocations)
    } else {
      setFilteredLocations(locations)
    }
  }

  const handleEdit = () => {
    if (selectedLocations.length > 0) {
      const locationsToBeEdited = [...selectedLocations]
      editLocations(locationsToBeEdited)
    }
  }

  const validateInput = () => {     
    return dialog.options.some(option => option.sent === null) ? 'There is a problem, select On or Off for each message type': ''
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          {notificationText && (
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success'
              title='Success'
              text={notificationText}
            />
          )}
          <DashboardHeader
            locations={locations}
            linkContacts={location.state?.linkContacts}
            selectedLocations={selectedLocations}
            onClickLinked={onClickLinked}
            onOnlyShowSelected={onOnlyShowSelected}
            linkSource={location.state?.linkSource}
          />
          <div className='govuk-grid-column-full govuk-body'>
            {!isFilterVisible
              ? (
                <>
                  <Button
                    text='Open filter'
                    className='govuk-button govuk-button--secondary inline-block'
                    onClick={() => onOpenCloseFilter()}
                  />
                  {(!location.state || !location.state.linkContacts || location.state.linkContacts.length === 0) && (
                    <>
                    &nbsp; &nbsp;
                      <ButtonMenu
                        title='More actions'
                        options={moreActions}
                        onSelect={(index) => onMoreAction(index)}
                      />
                    &nbsp; &nbsp;
                      <Button
                        text='Print'
                        className='govuk-button govuk-button--secondary inline-block'
                      />
                    </>
                  )}
                  <LocationsTable
                    locations={locations}
                    displayedLocations={displayedLocations}
                    filteredLocations={filteredLocations}
                    selectedLocations={selectedLocations}
                    setLocations={setLocations}
                    setSelectedLocations={setSelectedLocations}
                    setFilteredLocations={setFilteredLocations}
                    resetPaging={resetPaging}
                    setResetPaging={setResetPaging}
                    onAction={onAction}
                    actionText='Delete'
                    linkContacts={location.state?.linkContacts}
                  />
                  <Pagination
                    totalPages={Math.ceil(
                      filteredLocations.length / locationsPerPage
                    )}
                    onPageChange={(val) => setCurrentPage(val)}
                    holdPage={holdPage}
                    setHoldPage={setHoldPage}
                    pageList
                    reset={resetPaging}
                  />
                </>
                )
              : (
                <div className='govuk-grid-row'>
                  <div className='govuk-grid-column-one-quarter govuk-!-padding-bottom-3 locations-filter-container'>
                    <SearchFilter
                      locations={locations}
                      setFilteredLocations={setFilteredLocations}
                      resetPaging={resetPaging}
                      setResetPaging={setResetPaging}
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      selectedLocationTypeFilters={selectedLocationTypeFilters}
                      setSelectedLocationTypeFilters={
                      setSelectedLocationTypeFilters
                    }
                      selectedBusinessCriticalityFilters={
                      selectedBusinessCriticalityFilters
                    }
                      setSelectedBusinessCriticalityFilters={
                      setSelectedBusinessCriticalityFilters
                    }
                      selectedKeywordFilters={selectedKeywordFilters}
                      setSelectedKeywordFilters={setSelectedKeywordFilters}
                      selectedGroundWaterRiskFilters={
                      selectedGroundWaterRiskFilters
                    }
                      setSelectedGroundWaterRiskFilters={
                      setSelectedGroundWaterRiskFilters
                    }
                      selectedRiverSeaRiskFilters={selectedRiverSeaRiskFilters}
                      setSelectedRiverSeaRiskFilters={
                      setSelectedRiverSeaRiskFilters
                    }
                      selectedFloodMessagesAvailableFilters={
                      selectedFloodMessagesAvailableFilters
                    }
                      setSelectedFloodMessagesAvailableFilters={
                      setSelectedFloodMessagesAvailableFilters
                    }
                      selectedFloodMessagesSentFilters={
                      selectedFloodMessagesSentFilters
                    }
                      setSelectedFloodMessagesSentFilters={
                      setSelectedFloodMessagesSentFilters
                    }
                      selectedLinkedFilters={selectedLinkedFilters}
                      setSelectedLinkedFilters={setSelectedLinkedFilters}
                    />
                  </div>

                <div className='govuk-grid-column-three-quarters'>
                  <div className='govuk-grid-row'>
                    <Button
                      text='Close Filter'
                      className='govuk-button govuk-button--secondary'
                      onClick={() => onOpenCloseFilter()}
                    />
                      {(!location.state || !location.state.linkContacts || location.state.linkContacts.length === 0) && (
                        <>
                        &nbsp; &nbsp;
                        <ButtonMenu
                          title='More actions'
                          options={moreActions}
                          onSelect={(index) => onMoreAction(index)}
                        />
                        &nbsp; &nbsp;
                        <Button
                          text='Print'
                          className='govuk-button govuk-button--secondary inline-block'
                        />
                        </>
                      )}
                  </div>
                  <LocationsTable
                    locations={locations}
                    displayedLocations={displayedLocations}
                    filteredLocations={filteredLocations}
                    selectedLocations={selectedLocations}
                    setLocations={setLocations}
                    setSelectedLocations={setSelectedLocations}
                    setFilteredLocations={setFilteredLocations}
                    resetPaging={resetPaging}
                    setResetPaging={setResetPaging}
                    onAction={onAction}
                      actionText='Delete'
                      linkContacts={location.state?.linkContacts}
                  />
                  <Pagination
                    totalPages={Math.ceil(
                      filteredLocations.length / locationsPerPage
                    )}
                    onPageChange={(val) => setCurrentPage(val)}
                    holdPage={holdPage}
                    setHoldPage={setHoldPage}
                    pageList
                    reset={resetPaging}
                  />
                </div>
              </div>
            )}
            {dialog.show && (
              <>
                <Popup
                  onEdit={() => handleEdit()}
                  onDelete={() => handleDelete()}
                  onClose={() => setDialog({ ...dialog, show: false })}
                  title={dialog.title}
                  popupText={dialog.text}
                  buttonText={dialog.buttonText}
                  buttonClass={dialog.buttonClass}
                  options={dialog.options}
                  error={dialog.error}
                  setError={(val) =>
                    setDialog((dial) => ({ ...dial, error: val }))
                  }
                  validateInput={() => validateInput()}
                  defaultValue={
                    dialog.input ? targetLocation.additionals.locationName : ''
                  }
                  onRadioChange={handleRadioChange} 
                  />

              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
