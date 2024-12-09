import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import Popup from '../../../../../common/components/custom/Popup'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import ButtonMenu from '../../../../../common/components/custom/ButtonMenu'
import BackLink from '../../../../../common/components/custom/BackLink'
import { backendCall } from '../../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import RiskAreaType from '../../../../../common/enums/RiskAreaType'
import {
  getGroundwaterFloodRiskRatingOfLocation,
  getRiversAndSeaFloodRiskRatingOfLocation
} from '../../../../../common/services/WfsFloodDataService'
import { orgManageLocationsUrls } from '../../../..//routes/manage-locations/ManageLocationsRoutes'
import DashboardHeader from './dashboard-components/DashboardHeader'
import LocationsTable from './dashboard-components/LocationsTable'
import SearchFilter from './dashboard-components/SearchFilter'
import { setCurrentLocation } from '../../../../../common/redux/userSlice'

export default function ViewLocationsDashboardPage () {
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
  const [dialog, setDialog] = useState({
    show: false,
    text: '',
    title: '',
    buttonText: '',
    buttonClass: '',
    input: '',
    charLimit: 0,
    error: ''
  })

  const locationsPerPage = 10

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
      const locations = []
      if (data) {
        data.forEach((location) => {
          locations.push(geoSafeToWebLocation(location))
        })
      }
      setLocations(locations)
      setFilteredLocations(locations)
    }
    getLocations()

    const updateLocationData = async () => {
      const riverSeaRisks = await Promise.all(
        locations.map((location) =>
          getRiskCategory({
            riskAreaType: RiskAreaType.RIVERS_AND_SEA,
            location
          })
        )
      )
      const groundWaterRisks = await Promise.all(
        locations.map((location) =>
          getRiskCategory({
            riskAreaType: RiskAreaType.GROUNDWATER,
            location
          })
        )
      )

      const updatedLocations = locations.map((location, idx) => ({
        ...location,
        riverSeaRisk: riverSeaRisks[idx],
        groundWaterRisk: groundWaterRisks[idx]
      }))
      setLocations(updatedLocations)
      setFilteredLocations(updatedLocations)
    }
    updateLocationData()

    // TODO: Get linked contacts from the API (EAN-1364)
    const getContacts = async () => {
      const updatedLocations = locations.map((location, idx) => ({
        ...location,
        linked_contacts: ['Contact 1', 'Contact 2']
      }))
    }
    getContacts()
  }, [])

  const getRiskCategory = async ({ riskAreaType, location }) => {
    let riskCategory = null

    const riskData = {
      'v.low': { className: 'very-low-risk', title: 'Very low risk' },
      low: { className: 'low-risk', title: 'Low risk' },
      medium: { className: 'medium-risk', title: 'Medium risk' },
      high: { className: 'high-risk', title: 'High risk' },
      unlikely: { className: 'unlikely-risk', title: 'Unlikely' },
      possible: { className: 'possible-risk', title: 'Possible' },
      // incase the wfs returns no data
      unavailable: { className: '', title: 'Unavailable' }
    }

    if (
      location.additionals.other?.location_type !==
        LocationDataType.ADDRESS &&
        location.additionals.other?.location_type !==
        LocationDataType.X_AND_Y_COORDS &&
      location.coordinates != null
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
    'Link selected to locations',
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
  const [selectedKeywordFilters, setSelectedKeywordFilters] =
    useState([])
  const [selectedLinkedFilters, setSelectedLinkedFilters] =
    useState([])

  const deleteDialog = (locationToBeDeleted) => {
    setDialog({
      show: true,
      text: (
        <>
          If you continue {locationToBeDeleted.name} will be deleted from this account and will
          not get flood messages.
        </>
      ),
      title: 'Delete location',
      buttonText: 'Delete location',
      buttonClass: 'govuk-button--warning'
    })
  }

  const selectDeleteDialog = () => {
    if (selectedLocations && selectedLocations.length > 0) {
      setDialog({
        show: true,
        text: (
          <>
            If you continue {selectedLocations.length} {selectedLocations.length > 1 ? 'locations' : 'location'} will be deleted from this account and
            will not get flood messages.
          </>
        ),
        title: `Delete ${selectedLocations.length} ${selectedLocations.length > 1 ? 'locations' : 'location'}`,
        buttonText: 'Delete locations',
        buttonClass: 'govuk-button--warning'
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
      deleteDialog(location)
    }
  }

  const onMoreAction = (index) => {
    if (index === 0) {
      // TODO - linking
    } else if (index === 1) {
      selectDeleteDialog()
    }
  }

  const onClickLinked = (type) => {
    const updatedFilteredLocations = locations.filter((location) =>
      (type === 'messages' && location.additionals.other?.alertTypes.length > 0) ||
      (type === 'links' && location.linked_contacts?.length > 0) ||
      (type === 'no-links' && location.linked_contacts?.length === 0) ||
      (type === 'high-medium-risk' && 
        (location.riverSeaRisk?.title === 'Medium risk' || location.riverSeaRisk?.title === 'High risk') &&
        location.additionals.other?.alertTypes.length === 0) ||
      (type === 'low-risk' && 
        location.riverSeaRisk?.title === 'Low risk' &&
        location.additionals.other?.alertTypes.length === 0)
    )

    let selectedFilterType = []
    if (type === 'links') {
      selectedFilterType = 'Yes'
    } else {
      selectedFilterType = 'No'
    }

    setSelectedFilters([])

    setSelectedLocationTypeFilters([])
    setSelectedBusinessCriticalityFilters([])
    setSelectedKeywordFilters([])
    setSelectedGroundWaterRiskFilters([])
    setSelectedRiverSeaRiskFilters([])
    setSelectedFloodMessagesAvailableFilters([])

    setSelectedLinkedFilters([selectedFilterType])
    setSelectedFilters([selectedFilterType])
    setIsFilterVisible(true)

    setFilteredLocations([...updatedFilteredLocations])

    setResetPaging(!resetPaging)
  }

  const onOpenCloseFilter = () => {
    setHoldPage(currentPage)
    setIsFilterVisible(!isFilterVisible)
  }

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

    setNotificationText(locationsToRemove.length > 1 ? 'Locations deleted' : 'Location deleted')

    setDialog({ ...dialog, show: false })
    setTargetLocation(null)
    setSelectedLocations([])

    setResetPaging(!resetPaging)
  }
    
  const handleDelete = () => {
    if (targetLocation) {
      removeLocations([targetLocation])
      if (selectedLocations.length > 0) {
        const updatedSelectedLocations = selectedLocations.filter(location => location !== targetLocation)
        setSelectedLocations(updatedSelectedLocations)
      }
    } else if (selectedLocations.length > 0) {
      const locationsToRemove = [...selectedLocations]
      removeLocations(locationsToRemove)
    }
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
            onClickLinked={onClickLinked}
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
                      setSelectedLocationTypeFilters={setSelectedLocationTypeFilters}
                      selectedBusinessCriticalityFilters={selectedBusinessCriticalityFilters}
                      setSelectedBusinessCriticalityFilters={setSelectedBusinessCriticalityFilters}
                      selectedKeywordFilters={selectedKeywordFilters}
                      setSelectedKeywordFilters={setSelectedKeywordFilters}
                      selectedGroundWaterRiskFilters={selectedGroundWaterRiskFilters}
                      setSelectedGroundWaterRiskFilters={setSelectedGroundWaterRiskFilters}
                      selectedRiverSeaRiskFilters={selectedRiverSeaRiskFilters}
                      setSelectedRiverSeaRiskFilters={setSelectedRiverSeaRiskFilters}
                      selectedFloodMessagesAvailableFilters={selectedFloodMessagesAvailableFilters}
                      setSelectedFloodMessagesAvailableFilters={setSelectedFloodMessagesAvailableFilters}
                      selectedFloodMessagesSentFilters={selectedFloodMessagesSentFilters}
                      setSelectedFloodMessagesSentFilters={setSelectedFloodMessagesSentFilters}
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
                  onDelete={() => handleDelete()}
                  onClose={() => setDialog({ ...dialog, show: false })}
                  title={dialog.title}
                  popupText={dialog.text}
                  buttonText={dialog.buttonText}
                  buttonClass={dialog.buttonClass}
                  setError={(val) =>
                    setDialog((dial) => ({ ...dial, error: val }))}
                  defaultValue={dialog.input ? targetLocation.name : ''}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
