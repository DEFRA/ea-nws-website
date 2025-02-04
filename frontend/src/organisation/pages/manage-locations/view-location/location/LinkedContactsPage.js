import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import linkIcon from '../../../../../common/assets/images/link.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import ContactsTable from '../../../../components/custom/ContactsTable'
import Button from '../../../../../common/components/gov-uk/Button'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../../../common/components/gov-uk/Radio'
import AlertType from '../../../../../common/enums/AlertType'
import { getLocationAdditionals, setCurrentLocationAlertTypes } from '../../../../../common/redux/userSlice'
import { infoUrls } from '../../../../routes/info/InfoRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import LocationHeader from './location-information-components/LocationHeader'
import { setLinkLocations } from '../../../../../common/redux/userSlice'
import { geoSafeToWebContact } from '../../../../../common/services/formatters/ContactFormatter'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { backendCall } from '../../../../../common/services/BackendService'

export default function LinkedContactsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [linkedContacts, setLinkedContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [displayedContacts, setDisplayedContacts] = useState([])
  const [resetPaging, setResetPaging] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const currentLocation = geoSafeToWebLocation(useSelector((state) => state.session.currentLocation))
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const contactsPerPage = 10

  const test_contacts = [
    {
      id: '1',
      enabled: true,
      firstname: 'Stephanie',
      lastname: 'Beach',
      emails: ['stephanie.beach@gmail.com', 'steph.beach@gmail.com'],
      mobilePhones: ['07343454590', '07889668367'],
      homePhones: ['01475721535'],
      language: 'EN',
      position: null,
      unit: null,
      service: null,
      comments: null,
      additionals: [
        { id: 'lastAccessedUrl', value: { s: '/signup/accountname/add' } },
        { id: 'signUpComplete', value: { s: 'true' } },
        { id: 'businessName', value: { s: 'thatOne' } },
        { id: 'jobTitle', value: { s: 'Operations Director' } },
        { id: 'keywords', value: { s: '["Team 1", "Team 2"]' } }
      ],
      unverified: {
        homePhones: [{ address: '01475721535' }]
      },
      metatdata: null,
      pois: null,
      role: null,
      pendingRole: null
    },
    {
      id: '2',
      enabled: true,
      firstname: 'Mary',
      lastname: 'Pepper',
      emails: ['mary.pepper@gmail.com', 'ma.pepper@gmail.com'],
      mobilePhones: ['07343454590', '07889668367'],
      homePhones: ['01475721535'],
      language: 'EN',
      position: null,
      unit: null,
      service: null,
      comments: null,
      additionals: [
        { id: 'lastAccessedUrl', value: { s: '/signup/accountname/add' } },
        { id: 'signUpComplete', value: { s: 'true' } },
        { id: 'businessName', value: { s: 'thatOne' } },
        { id: 'jobTitle', value: { s: 'Regional Manager' } },
        { id: 'keywords', value: { s: '["Team 2"]' } }
      ],
      unverified: {
        homePhones: [{ address: '01475721535' }]
      },
      metatdata: null,
      pois: null,
      role: null,
      pendingRole: null
    }]

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
      // const locationsDataToSend = { orgId, location: currentLocation }
      // const { data } = await backendCall(
      //   contactsDataToSend,
      //   'api/elasticache/list_linked_contacts',
      //   navigate
      // )

      // const contactsUpdate = []
      // if (data) {
      //   data.forEach((contact) => {
      //     contactsUpdate.push(geoSafeToWebContact(contact))
      //   })
      // }

      // TODO - remove test code
      const contactsUpdate = []
      test_contacts.forEach((contact) => {
        contactsUpdate.push(geoSafeToWebContact(contact))
      })

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
    navigate(orgManageContactsUrls.view.dashboard)
  }

  const onUnlink = (e, action, contact) => {
    const contactsToUnlink = [contact]
    unlinkContacts(contactsToUnlink)
  }

  const unlinkContacts = (contactsToUnlink) => {
    contactsToUnlink.forEach(async function (contact, idx) {
      const dataToSend = { authToken, orgId, locationId: currentLocation.id, contactIds: [contact.id] }

      const { errorMessage } = await backendCall(
        dataToSend,
        'api/location/detach_contacts',
        navigate
      )

      if (errorMessage) {
        console.log(errorMessage)
      }
    })

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
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      
      <Button
        text='Link to contacts'
        className='govuk-button govuk-button--secondary govuk-!-margin-right-2'
        onClick={linkToContacts}
      />
      <Button
        text='Unlink selected'
        className='govuk-button govuk-button--secondary'
        onClick={() => unlinkContacts(selectedContacts)} 
      />
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
        <LocationHeader
          currentPage={orgManageLocationsUrls.view.viewLinkedContacts}
        />
        {linkedContactsSection}
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
      </main>
    </>
  )
}
