import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import { setLinkLocations } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { geoSafeToWebContact } from '../../../../../common/services/formatters/ContactFormatter'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import ContactsTable from '../../../../components/custom/ContactsTable'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import LocationHeader from './location-information-components/LocationHeader'

export default function LinkedContactsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [linkedContacts, setLinkedContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [displayedContacts, setDisplayedContacts] = useState([])
  const [resetPaging, setResetPaging] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [unlinkNotification, setUnlinkNotification] = useState('')

  const currentLocation = geoSafeToWebLocation(useSelector((state) => state.session.currentLocation))
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const contactsPerPage = 10

  useEffect(() => {
    setFilteredContacts(linkedContacts)
    setDisplayedContacts(linkedContacts)
  }, [linkedContacts])

  useEffect(() => {
    setSelectedContacts([])
  }, [resetPaging])

  useEffect(() => {
    setDisplayedContacts(
      filteredContacts.slice(
        (currentPage - 1) * contactsPerPage,
        currentPage * contactsPerPage
      )
    )
  }, [filteredContacts, currentPage])

  useEffect(() => {
    const getLinkedContacts = async () => {
      const locationsDataToSend = { orgId, location: currentLocation }
      const { data } = await backendCall(
        locationsDataToSend,
        'api/elasticache/list_linked_contacts',
        navigate
      )

      const contactsUpdate = []
      if (data) {
        data.forEach((contact) => {
          contactsUpdate.push(geoSafeToWebContact(contact))
        })
      }

      contactsUpdate.forEach(async function (contact, idx) {
        const contactsDataToSend = { authToken, orgId, contact }
        const { data } = await backendCall(
          contactsDataToSend,
          'api/elasticache/list_linked_locations',
          navigate
        )

        contact.linked_locations = []
        if (data) {
          data.forEach((locationID) => {
            contact.linked_locations.push(locationID)
          })
        }
      })

      setLinkedContacts(contactsUpdate)
      setFilteredContacts(contactsUpdate)
    }

    getLinkedContacts()
  }, [])

  const linkToContacts = () => {
    const linkLocations = [currentLocation.id]
    dispatch(setLinkLocations(linkLocations))
    navigate(orgManageContactsUrls.view.dashboard, {state: {
      linkLocations: linkLocations, linkSource: 'info'
    }})
  }

  const getUnlinkText = (contactsUnlinked) => {
    let unlinkText = ''

    if (contactsUnlinked.length > 0) {
      unlinkText = contactsUnlinked.length + ' contact' + (contactsUnlinked.length > 1 ? 's' : '') + ' unlinked'
    }

    return unlinkText
  }

  const onUnlink = async (e, action, contact) => {
    const contactsToUnlink = [contact]
    await unlinkContacts(contactsToUnlink)
  }

  const unlinkContacts = async (contactsToUnlink) => {
    for (const contact of contactsToUnlink) {
      const dataToSend = { authToken, orgId, locationId: currentLocation.id, contactIds: [contact.id] }

      const { errorMessage } = await backendCall(
        dataToSend,
        'api/location/detach_contacts',
        navigate
      )

      if (errorMessage) {
        console.log(errorMessage)
      }
    }

    setUnlinkNotification(getUnlinkText(contactsToUnlink))

    const updatedContacts = linkedContacts.filter(
      (contact) => !contactsToUnlink.includes(contact)
    )
    const updatedFilteredContacts = filteredContacts.filter(
      (contact) => !contactsToUnlink.includes(contact)
    )

    setLinkedContacts([...updatedContacts])
    setFilteredContacts([...updatedFilteredContacts])
    setSelectedContacts([])

    setResetPaging(!resetPaging)
  }

  const linkedContactsSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Linked contacts
      </h2>
      <div className='govuk-!-margin-top-2 govuk-!-margin-bottom-5' style={{ height: '2px', backgroundColor: 'black' }} />
      {linkedContacts.length === 0 &&
        <div className='govuk-!-width-one-half govuk-!-margin-bottom-6'>
          <p className='govuk-body'>
            No contacts have been linked to this location. This means there are currently no flood messages sent to contacts for this location.
          </p>
          <p className='govuk-body'>
            To enable contacts to get flood messages, you need to link them to the locations you want them to get messages for. Any contacts not linked to locations will not get flood messages.
          </p>
        </div>}
      <Button
        text='Link to contacts'
        className='govuk-button govuk-button--secondary govuk-!-margin-right-2'
        onClick={linkToContacts}
      />
      {linkedContacts.length > 0 && <Button
        text='Unlink selected'
        className='govuk-button govuk-button--secondary'
        onClick={() => unlinkContacts(selectedContacts)}
                                    />}
    </>
  )

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(orgManageLocationsUrls.view.dashboard)
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
        <LocationHeader
          currentPage={orgManageLocationsUrls.view.viewLinkedContacts}
        />
        {linkedContactsSection}
        {linkedContacts.length > 0 &&
          <>
            <ContactsTable
              contacts={linkedContacts}
              displayedContacts={displayedContacts}
              filteredContacts={filteredContacts}
              selectedContacts={selectedContacts}
              setContacts={setLinkedContacts}
              setSelectedContacts={setSelectedContacts}
              setFilteredContacts={setFilteredContacts}
              resetPaging={resetPaging}
              setResetPaging={setResetPaging}
              onAction={onUnlink}
              actionText='Unlink'
            />
            <Pagination
              totalPages={Math.ceil(
                filteredContacts.length / contactsPerPage
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
