import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import ButtonMenu from '../../../../../common/components/custom/ButtonMenu'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Popup from '../../../../../common/components/custom/Popup'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import AlertType from '../../../../../common/enums/AlertType'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import RiskAreaType from '../../../../../common/enums/RiskAreaType'
import { setCurrentLocation } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import {
  getGroundwaterFloodRiskRatingOfLocation,
  getRiversAndSeaFloodRiskRatingOfLocation
} from '../../../../../common/services/WfsFloodDataService'
import { orgManageLocationsUrls } from '../../../..//routes/manage-locations/ManageLocationsRoutes'
import { riskData } from '../../../../components/custom/RiskCategoryLabel'
import DashboardHeader from './dashboard-components/DashboardHeader'
import LocationsTable from './dashboard-components/LocationsTable'
import SearchFilter from './dashboard-components/SearchFilter'

export default function ViewLocationsDashboardPage() {
  const [locations, setLocations] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [notificationText, setNotificationText] = useState('')
  const [selectedLocations, setSelectedLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [targetLocation, setTargetLocation] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const [holdPage, setHoldPage] = useState(0)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [displayedLocations, setDisplayedLocations] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([])
  const orgId = useSelector((state) => state.session.orgId)
  const [optionsSelected, setOptionsSelected] = useState({
    alert: false,
    warning: false,
    severeWarning: false
  })
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

  useEffect(() => {
    setFilteredLocations(locations)
  }, [])

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

      // TODO: Get linked contacts from the API (EAN-1364)
      let tempSwitch = false
      locationsUpdate.forEach(function (location) {
        if (tempSwitch) {
          location.linked_contacts = ['Contact 1', 'Contact 2']
          tempSwitch = false
        } else {
          location.linked_contacts = []
          tempSwitch = true
        }
      })

      setLocations(locationsUpdate)
      setFilteredLocations(locationsUpdate)
    }
    getLocations()
  }, [])

  const getRiskCategory = async ({ riskAreaType, location }) => {
    let riskCategory = null

    if (
      (location.additionals.other?.location_data_type !==
        LocationDataType.ADDRESS &&
        location.additionals.other?.location_data_type !==
          LocationDataType.X_AND_Y_COORDS) ||
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
    const unavailableLocationsCount = 0
    const alertOnlyLocationsCount = 0
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

  const editDialog = (locationsToBeEdited) => {
    console.log('SelectedLocations:')
    console.log(locationsToBeEdited)
    if (locationsToBeEdited && locationsToBeEdited.length > 0) {
      setDialog({
        show: true,
        text: <>{editLocationText(locationsToBeEdited)}</>,
        title: `Update message settings for ${locationsToBeEdited.length} ${
          locationsToBeEdited.length > 1 ? 'locations' : 'location'
        }`,
        buttonText: `Update message settings`,
        buttonClass: '',
        options: [
          {
            label: 'Severe flood warnings',
            value: AlertType.SEVERE_FLOOD_WARNING,
            sent: false
          },
          {
            label: 'Flood warnings',
            value: AlertType.FLOOD_WARNING,
            sent: false
          },
          {
            label: 'Flood alerts',
            value: AlertType.FLOOD_ALERT,
            sent: false
          }
        ],
        error: ''
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

  const onMoreAction = (index) => {
    switch (index) {
      case 0:
        // TODO - linking (EAN-1126)
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

  const editLocations = (locationsToEdit) => {}

  const removeLocations = (locationsToRemove) => {
    const updatedLocations = locations.filter(
      (location) => !locationsToRemove.includes(location)
    )
    const updatedFilteredLocations = filteredLocations.filter(
      (location) => !locationsToRemove.includes(location)
    )

    // dispatch(setLocations(updatedLocations))
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

  const handleEdit = () => {
    console.log('inHere!')
    console.log('optionsSelected', optionsSelected)
    if (selectedLocations.length > 0) {
      const locationsToBeEdited = [...selectedLocations]
      editLocations(locationsToBeEdited)
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
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
            onClickLinked={onClickLinked}
          />
          <div className='govuk-grid-column-full govuk-body'>
            {!isFilterVisible ? (
              <>
                <Button
                  text='Open filter'
                  className='govuk-button govuk-button--secondary inline-block'
                  onClick={() => onOpenCloseFilter()}
                />
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
                  // onClick={() => setIsFilterVisible(!isFilterVisible)}
                />
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
            ) : (
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
                  setError={(val) =>
                    setDialog((dial) => ({ ...dial, error: val }))
                  }
                  defaultValue={
                    dialog.input ? targetLocation.additionals.locationName : ''
                  }
                  setOptionsSelected={setOptionsSelected}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
