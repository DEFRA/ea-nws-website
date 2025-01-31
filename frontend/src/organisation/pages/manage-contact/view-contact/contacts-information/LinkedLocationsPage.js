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

  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const contactName = currentContact?.firstname + ' ' + currentContact?.lastname
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  useEffect(() => {
    setFilteredLocations(linkedLocations)
    setDisplayedLocations(linkedLocations)
  }, [linkedLocations])

  useEffect(() => {
    const getLinkedLocations = async () => {
      const contactsDataToSend = { orgId, contact: currentContact }
      const { data } = await backendCall(
        contactsDataToSend,
        'api/elasticache/list_linked_locations',
        navigate
      )

      console.log(data)

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

      console.log(locationsUpdate)
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

  const linkedLocationsSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Linked locations
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      
      <Button
        text='Link to locations'
        className='govuk-button govuk-button--secondary'
        onClick={linkToLocations}
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
          // resetPaging={resetPaging}
          // setResetPaging={setResetPaging}
          // onAction={onAction}
        />
      </main>
    </>
  )
}
