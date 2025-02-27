import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import RiskAreaType from '../../../../../common/enums/RiskAreaType'
import { setCurrentLocation } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import {
  getGroundwaterFloodRiskRatingOfLocation,
  getRiversAndSeaFloodRiskRatingOfLocation
} from '../../../../../common/services/WfsFloodDataService'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import LocationsTable from '../../../../components/custom/LocationsTable'
import { riskData } from '../../../../components/custom/RiskCategoryLabel'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import ContactHeader from './contact-information-components/ContactHeader'

export default function LinkedLocationsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [linkedLocations, setLinkedLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [displayedLocations, setDisplayedLocations] = useState([])
  const [resetPaging, setResetPaging] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [unlinkNotification, setUnlinkNotification] = useState('')

  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const contactName = currentContact?.firstname + ' ' + currentContact?.lastname
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const locationsPerPage = 10

  useEffect(() => {
    setFilteredLocations(linkedLocations)
    setDisplayedLocations(linkedLocations)
  }, [linkedLocations])

  useEffect(() => {
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
    const getLinkedLocations = async () => {
      const contactsDataToSend = { orgId, contact: currentContact }
      const { data } = await backendCall(
        contactsDataToSend,
        'api/elasticache/list_linked_locations',
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
          data.forEach((contactID) => {
            location.linked_contacts.push(contactID)
          })
        }
      })

      setLinkedLocations(locationsUpdate)
      setFilteredLocations(locationsUpdate)
    }

    getLinkedLocations()
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
      location.coordinates.longitude === null
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

  const linkToLocations = () => {
    const linkContacts = [currentContact.id]
    navigate(orgManageLocationsUrls.view.dashboard, {
      state: {
        linkContacts, linkSource: 'info'
      }
    })
  }

  const getUnlinkText = (locationsUnlinked) => {
    let unlinkText = ''

    if (locationsUnlinked.length > 0) {
      unlinkText = locationsUnlinked.length + ' location' + (locationsUnlinked.length > 1 ? 's' : '') + ' unlinked'
    }

    return unlinkText
  }

  const onAction = async (e, action, location) => {
    if (action === 'view') {
      e.preventDefault()
      dispatch(setCurrentLocation(location))
      navigate(orgManageLocationsUrls.view.viewLocation)
    } else {
      const locationsToUnlink = [location]
      await unlinkLocations(locationsToUnlink)
    }
  }

  const unlinkLocations = async (locationsToUnlink) => {
    for (const location of locationsToUnlink) {
      const dataToSend = { authToken, orgId, locationId: location.id, contactIds: [currentContact.id] }

      const { errorMessage } = await backendCall(
        dataToSend,
        'api/location/detach_contacts',
        navigate
      )

      if (errorMessage) {
        console.log(errorMessage)
      }
    }

    setUnlinkNotification(getUnlinkText(locationsToUnlink))

    const updatedLocations = linkedLocations.filter(
      (location) => !locationsToUnlink.includes(location)
    )
    const updatedFilteredLocations = filteredLocations.filter(
      (location) => !locationsToUnlink.includes(location)
    )

    setLinkedLocations([...updatedLocations])
    setFilteredLocations([...updatedFilteredLocations])
    setSelectedLocations([])

    setResetPaging(!resetPaging)
  }

  const linkedLocationsSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Linked locations
      </h2>
      <div className='govuk-!-margin-top-2 govuk-!-margin-bottom-5' style={{ height: '2px', backgroundColor: 'black' }} />
      {linkedLocations.length === 0 &&
        <div className='govuk-!-width-one-half govuk-!-margin-bottom-6'>
          <p className='govuk-body'>
            This user is not currently getting any flood messages. You need to link them to the locations you want them to get messages for.
          </p>
          <p className='govuk-body'>
            This user will then get sent flood messages for all the locations they're linked to.
          </p>
        </div>}
      <Button
        text='Link to locations'
        className='govuk-button govuk-button--secondary govuk-!-margin-right-2'
        onClick={linkToLocations}
      />
      {linkedLocations.length > 0 &&
        <Button
          text='Unlink selected'
          className='govuk-button govuk-button--secondary'
          onClick={() => unlinkLocations(selectedLocations)}
        />}
    </>
  )

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(orgManageContactsUrls.view.dashboard)
  }

  return (
    <>

      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-0'>
        {unlinkNotification.length > 0 && (
          <NotificationBanner
            className='govuk-notification-banner govuk-notification-banner--success'
            title='Success'
            text={unlinkNotification}
          />
        )}
        <ContactHeader
          contactName={contactName}
          currentPage={orgManageContactsUrls.view.viewLinkedLocations}
        />
        {linkedLocationsSection}
        {linkedLocations.length > 0 &&
          <>
            <LocationsTable
              locations={linkedLocations}
              displayedLocations={displayedLocations}
              filteredLocations={filteredLocations}
              selectedLocations={selectedLocations}
              setLocations={setLinkedLocations}
              setSelectedLocations={setSelectedLocations}
              setFilteredLocations={setFilteredLocations}
              resetPaging={resetPaging}
              setResetPaging={setResetPaging}
              onAction={onAction}
              actionText='Unlink'
              locationPrefix='linked'
            />
            <Pagination
              totalPages={Math.ceil(
                filteredLocations.length / locationsPerPage
              )}
              onPageChange={(val) => setCurrentPage(val)}
              pageList
              reset={resetPaging}
            />
          </>}
      </main>
    </>
  )
}
