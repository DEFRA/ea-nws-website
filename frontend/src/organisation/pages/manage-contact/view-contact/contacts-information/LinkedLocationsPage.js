import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import LocationsTable from '../../../../components/custom/LocationsTable'
import Button from '../../../../../common/components/gov-uk/Button'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import ContactHeader from './contact-information-components/ContactHeader'
import { setLinkContacts } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import {
  getGroundwaterFloodRiskRatingOfLocation,
  getRiversAndSeaFloodRiskRatingOfLocation
} from '../../../../../common/services/WfsFloodDataService'
import { riskData } from '../../../../components/custom/RiskCategoryLabel'
import RiskAreaType from '../../../../../common/enums/RiskAreaType'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'

export default function LinkedLocationsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [linkedLocations, setLinkedLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [displayedLocations, setDisplayedLocations] = useState([])
  const [resetPaging, setResetPaging] = useState(false)

  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const contactName = currentContact?.firstname + ' ' + currentContact?.lastname
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const test_locations = [
    {
      id: '1',
      enabled: true,
      name: 'UPRN',
      address: '34 Hughenden Road, High Wycombe, LE2 7BB',
      coordinates: { latitude: 51.629, longitude: -0.745 },
      geometry: null,
      geocode: null,
      additionals: [
        { id: 'locationName', value: { s: 'Location_01 - address variant' } },
        { id: 'parentID', value: { s: '' } },
        { id: 'targetAreas', value: { s: '' } },
        { id: 'keywords', value: { s: '["Midlands"]' } },
        {
          id: 'other',
          value: {
            s: JSON.stringify({
              full_address: 'some address',
              postcode: 'LE2 7BB',
              x_coordinate: 466413.18,
              y_coordinate: 105037.31,
              internal_reference: 'PS01, unit 57, HighW_07',
              business_criticality: 'Medium',
              location_type: 'Office',
              action_plan: '1. Dont panic!',
              notes:
                'John Smith has the flood plan for this location. His contact number is 01234 567 890',
              location_data_type: 'xycoords',
              alertTypes: ['ALERT_LVL_3']
            })
          }
        }
      ]
    },
    {
      id: '2',
      enabled: true,
      name: 'UPRN',
      address: 'London',
      coordinates: { latitude: 51.507, longitude: -0.126 },
      geometry: null,
      geocode: null,
      additionals: [
        { id: 'locationName', value: { s: 'Location_02 - xy coord variant' } },
        { id: 'parentID', value: { s: '' } },
        { id: 'targetAreas', value: { s: '' } },
        { id: 'keywords', value: { s: '[]' } },
        {
          id: 'other',
          value: {
            s: JSON.stringify({
              full_address: '',
              postcode: '',
              x_coordinate: 329000.58,
              y_coordinate: 478530.6,
              internal_reference: '',
              business_criticality: 'High',
              location_type: '',
              action_plan: '',
              notes: '',
              location_data_type: 'xycoords',
              alertTypes: ['ALERT_LVL_3', 'ALERT_LVL_2']
            })
          }
        }
      ]
    }]

  useEffect(() => {
    setFilteredLocations(linkedLocations)
    setDisplayedLocations(linkedLocations)
  }, [linkedLocations])

  useEffect(() => {
    setSelectedLocations([])
  }, [resetPaging])

  useEffect(() => {
    setDisplayedLocations(filteredLocations)
  }, [filteredLocations])

  useEffect(() => {
    const getLinkedLocations = async () => {
      // const contactsDataToSend = { orgId, contact: currentContact }
      // const { data } = await backendCall(
      //   contactsDataToSend,
      //   'api/elasticache/list_linked_locations',
      //   navigate
      // )

      // const locationsUpdate = []
      // if (data) {
      //   data.forEach((location) => {
      //     locationsUpdate.push(geoSafeToWebLocation(location))
      //   })
      // }

      // TODO - remove test code
      const locationsUpdate = []
      test_locations.forEach((location) => {
        locationsUpdate.push(geoSafeToWebLocation(location))
      })


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

  const linkToLocations = () => {
    const linkContacts = [currentContact.id]
    dispatch(setLinkContacts(linkContacts))
    navigate(orgManageLocationsUrls.view.dashboard)
  }

  const onUnlink = (e, action, location) => {
    const locationsToUnlink = [location]
    unlinkLocations(locationsToUnlink)
  }

  const unlinkLocations = (locationsToUnlink) => {
    locationsToUnlink.forEach(async function (location, idx) {
      const dataToSend = { authToken, orgId, locationId: location.id, contactIds: [currentContact.id] }

      const { errorMessage } = await backendCall(
        dataToSend,
        'api/location/detach_contacts',
        navigate
      )

      if (errorMessage) {
        console.log(errorMessage)
      }
    })

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
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      
      <Button
        text='Link to locations'
        className='govuk-button govuk-button--secondary govuk-!-margin-right-2'
        onClick={linkToLocations}
      />
      <Button
        text='Unlink selected'
        className='govuk-button govuk-button--secondary'
        onClick={() => unlinkLocations(selectedLocations)} 
      />
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
        <ContactHeader
          contactName={contactName}
          currentPage={orgManageContactsUrls.view.viewLinkedLocations}
        />
        {linkedLocationsSection}
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
          onAction={onUnlink}
          actionText='Unlink'
        />
      </main>
    </>
  )
}
