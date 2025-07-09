import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import AlertState from '../../../../../common/enums/AlertState.js'
import RiskAreaType from '../../../../../common/enums/RiskAreaType'
import {
  getAdditional,
  setCurrentLocation
} from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService.js'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { getRole } from '../../../../../common/utils/getRoleFromCurrentContact.js'
import LocationsTable from '../../../../components/custom/LocationsTable'
import { riskData } from '../../../../components/custom/RiskCategoryLabel'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import UserHeader from './user-information-components/UserHeader'

export default function LinkedLocationsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [linkedLocations, setLinkedLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [displayedLocations, setDisplayedLocations] = useState([])
  const [resetPaging, setResetPaging] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [unlinkNotification, setUnlinkNotification] = useState('')
  const [loading, setLoading] = useState(true)
  const [unlinking, setUnlinking] = useState(false)
  const [stage, setStage] = useState('')

  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const contactName = currentContact?.firstname + ' ' + currentContact?.lastname
  const authToken = useSelector((state) => state.session.authToken)

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
    const attachMessageCounts = async (locations) => {
      const { data: partnerId } = await backendCall(
        'data',
        'api/service/get_partner_id'
      )

      const options = {
        states: [AlertState.PAST],
        boundingBox: null,
        channels: [],
        partnerId
      }

      const twoYearsAgo = new Date()
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)

      const { data: alertsResponse } = await backendCall(
        { options, filterDate: twoYearsAgo, historic: true },
        'api/alert/list',
        navigate
      )

      const alertsList = alertsResponse?.alerts || []

      // Loop through locations, attaching a count of how many alerts match their TA_CODE
      return locations.map((loc) => {
        const targetAreas = loc.additionals.other?.targetAreas || []
        const taCodes = targetAreas.map((ta) => ta.TA_CODE)

        const count = alertsList.filter((alert) => {
          const placemark = alert.mode?.zoneDesc?.placemarks?.[0]
          if (!placemark?.extraInfo) return false
          const alertCode = getAdditional(placemark.extraInfo, 'TA_CODE')
          return alertCode && taCodes.includes(alertCode)
        }).length

        return {
          ...loc,
          message_count: count
        }
      })
    }

    const getLinkedLocations = async () => {
      const contactsDataToSend = { authToken, contact: currentContact }
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

      for (const location of locationsUpdate) {
        const contactsDataToSend = { authToken, location }
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

        const floodAreas = location?.additionals?.other?.targetAreas || []
        location.within = floodAreas?.length > 0
      }

      const fullLocationData = await attachMessageCounts(locationsUpdate)
      setLinkedLocations(fullLocationData)
      setFilteredLocations(fullLocationData)
      setLoading(false)
    }

    getLinkedLocations()
  }, [])

  const getRiskCategory = async ({ riskAreaType, location }) => {
    let riskCategory = null
    if (riskAreaType === RiskAreaType.RIVERS_AND_SEA) {
      riskCategory = location?.additionals?.other?.riverSeaRisk || 'unavailable'
    } else if (riskAreaType === RiskAreaType.GROUNDWATER) {
      riskCategory =
        location?.additionals?.other?.groundWaterRisk || 'unavailable'
    }

    return riskData[riskCategory]
  }

  const linkToLocations = (event) => {
    event.preventDefault()
    const linkContacts = [currentContact.id]
    navigate(orgManageLocationsUrls.view.dashboard, {
      state: {
        linkContacts,
        linkSource: 'info'
      }
    })
  }

  const getUnlinkText = (locationsUnlinked) => {
    let unlinkText = ''

    if (locationsUnlinked.length > 0) {
      unlinkText =
        locationsUnlinked.length +
        ' location' +
        (locationsUnlinked.length > 1 ? 's' : '') +
        ' unlinked'
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
    const numLocations = locationsToUnlink.length
    // only show the unlinking progress if more than one location
    // is being unlinked
    numLocations > 1 && setUnlinking(true)
    for (const [index, location] of locationsToUnlink.entries()) {
      setStage(`unlinking (${Math.round(((index + 1) / numLocations) * 100)}%)`)
      const dataToSend = {
        authToken,
        locationId: location.id,
        contactIds: [currentContact.id]
      }

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
    setUnlinking(false)
  }

  const linkedLocationsSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Linked locations
      </h2>
      <div
        className='govuk-!-margin-top-2 govuk-!-margin-bottom-5'
        style={{ height: '2px', backgroundColor: 'black' }}
      />
      {linkedLocations.length === 0 && (
        <div className='govuk-!-width-one-half govuk-!-margin-bottom-6'>
          <p className='govuk-body'>
            This user is not currently getting any flood messages. You need to
            link them to the locations you want them to get messages for.
          </p>
          <p className='govuk-body'>
            This user will then get sent flood messages for all the locations
            they're linked to.
          </p>
        </div>
      )}
      <Button
        text='Link to locations'
        className='govuk-button govuk-button--secondary govuk-!-margin-right-2'
        onClick={linkToLocations}
      />
      {linkedLocations.length > 0 && (
        <Button
          text='Unlink selected'
          className='govuk-button govuk-button--secondary'
          onClick={(event) => {
            event.preventDefault()
            unlinkLocations(selectedLocations)
          }}
        />
      )}
    </>
  )

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(orgManageContactsUrls.view.dashboard)
  }

  const userType = getRole(currentContact)

  return (
    <>
      <Helmet>
        <title>
          {contactName}'s linked locations - Manage users - Get flood warnings
          (professional) - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-0'>
        {unlinkNotification.length > 0 && (
          <NotificationBanner
            className='govuk-notification-banner govuk-notification-banner--success'
            title='Success'
            text={unlinkNotification}
          />
        )}
        <UserHeader
          contactName={contactName}
          currentPage={orgManageContactsUrls.view.viewLinkedLocations}
          userType={userType}
        />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {linkedLocationsSection}
            {linkedLocations.length > 0 && (
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
              </>
            )}
          </>
        )}
      </main>
      {unlinking && (
        <div className='popup-dialog'>
          <div className='popup-dialog-container govuk-!-padding-bottom-6'>
            <LoadingSpinner
              loadingText={<p className='govuk-body-l'>{stage}</p>}
            />
          </div>
        </div>
      )}
    </>
  )
}
