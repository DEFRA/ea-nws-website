import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import ButtonMenu from '../../../../../common/components/custom/ButtonMenu'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner'
import Popup from '../../../../../common/components/custom/Popup'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import { setOrgCurrentContact } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import {
  getFloodAreas,
  getFloodAreasFromShape
} from '../../../../../common/services/WfsFloodDataService'
import { geoSafeToWebContact } from '../../../../../common/services/formatters/ContactFormatter'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { useFetchAlerts } from '../../../../../common/services/hooks/GetHistoricalAlerts'
import UsersTable from '../../../../components/custom/UsersTable'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import DashboardHeader from './dashboard-components/DashboardHeader'
import SearchFilter from './dashboard-components/SearchFilter'

export default function ViewUsersDashboardPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const defaultContactsPerPage = 20

  const [contacts, setContacts] = useState([])
  const [notificationText, setNotificationText] = useState(
    location.state?.successMessage
  )
  const [selectedContacts, setSelectedContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [targetContact, setTargetContact] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const [holdPage, setHoldPage] = useState(0)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [displayedContacts, setDisplayedContacts] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([])
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const [contactsPerPage, setContactsPerPage] = useState(defaultContactsPerPage)
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
  const [loading, setLoading] = useState(true)
  const historyData = useFetchAlerts()

  useEffect(() => {
    if (!contactsPerPage) {
      window.print()
      setContactsPerPage(defaultContactsPerPage)
    }
  }, [displayedContacts])

  useEffect(() => {
    setCurrentPage(1)
    setSelectedContacts([])
  }, [resetPaging])

  useEffect(() => {
    if (contactsPerPage) {
      setDisplayedContacts(
        filteredContacts.slice(
          (currentPage - 1) * contactsPerPage,
          currentPage * contactsPerPage
        )
      )
    } else {
      setDisplayedContacts(filteredContacts)
    }
  }, [filteredContacts, currentPage, contactsPerPage])

  useEffect(() => {
    const getContacts = async () => {
      const dataToSend = { orgId }
      const contactsData = await backendCall(
        dataToSend,
        'api/elasticache/list_contacts',
        navigate
      )
      const contactsUpdate = []
      if (contactsData.data) {
        contactsData.data.forEach((contact) => {
          contactsUpdate.push(geoSafeToWebContact(contact))
        })
      }

      for (const contact of contactsUpdate) {
        const contactsDataToSend = { authToken, orgId, contact }
        const { data } = await backendCall(
          contactsDataToSend,
          'api/elasticache/list_linked_locations',
          navigate
        )

        contact.linked_locations = []
        contact.message_count = 0
        if (data && data.length > 0) {
          data.forEach(async function (location) {
            contact.linked_locations.push(location.id)
            const floodAreas = await getWithinAreas(
              geoSafeToWebLocation(location)
            )
            if (floodAreas && floodAreas.length > 0) {
              for (const area of floodAreas) {
                contact.message_count += getHistoricalData(
                  area.properties.TA_CODE,
                  historyData
                ).length
              }
            }
          })
        }
      }

      setContacts(contactsUpdate)
      setFilteredContacts(contactsUpdate)
      setLoading(false)
    }

    getContacts()
  }, [])

  const moreActions = ['Link selected to locations', 'Delete selected']

  // selected filters
  const [contactNameFilter, setContactNameFilter] = useState([])
  const [selectedUserTypeFilters, setSelectedUserTypeFilters] = useState([])
  const [selectedJobTitleFilters, setSelectedJobTitleFilters] = useState([])
  const [selectedKeywordFilters, setSelectedKeywordFilters] = useState([])
  const [selectedLinkedFilters, setSelectedLinkedFilters] = useState([])

  const getWithinAreas = async (location) => {
    let result = []
    if (
      location.additionals.other.location_data_type ===
      LocationDataType.X_AND_Y_COORDS
    ) {
      result = await getFloodAreas(
        location.coordinates.latitude,
        location.coordinates.longitude
      )
    } else if (location.geometry?.geoJson) {
      const geoJson = location.geometry.geoJson
      try {
        result = await getFloodAreasFromShape(geoJson)
      } catch {
        result = []
      }
    }
    return result
  }

  const getHistoricalData = (taCode, floodHistoryData) => {
    const floodCount = []
    const twoYearsAgo = moment().subtract(2, 'years')
    if (taCode && floodHistoryData) {
      const filteredData = floodHistoryData.filter(
        (alert) =>
          alert.CODE === taCode &&
          moment(alert.DATE, 'DD/MM/YYYY') > twoYearsAgo
      )
      floodCount.push(filteredData.length)
    }
    return floodCount
  }

  const deleteContactsText = (contactsToBeDeleted) => {
    let text = ''

    if (contactsToBeDeleted.length > 1) {
      text =
        contactsToBeDeleted.length +
        ' ' +
        (contactsToBeDeleted.length > 1 ? 'users' : 'user')
    } else {
      text =
        contactsToBeDeleted[0].firstname +
        (contactsToBeDeleted[0].lastname.length > 0
          ? ' ' + contactsToBeDeleted[0].lastname
          : '')
    }

    return text
  }

  const deleteDialog = (contactsToBeDeleted) => {
    if (contactsToBeDeleted && contactsToBeDeleted.length > 0) {
      setDialog({
        show: true,
        text: (
          <>
            If you continue {deleteContactsText(contactsToBeDeleted)} will be
            deleted from this account and will not get flood messages.
          </>
        ),
        title: `Delete ${
          contactsToBeDeleted.length > 1 ? contactsToBeDeleted.length : ''
        } ${contactsToBeDeleted.length > 1 ? 'users' : 'user'}`,
        buttonText: `Delete ${
          contactsToBeDeleted.length > 1 ? 'users' : 'user'
        }`,
        buttonClass: 'govuk-button--warning'
      })
    }
  }

  const onAction = (e, action, contact) => {
    setTargetContact(contact)
    if (action === 'view') {
      e.preventDefault()
      dispatch(setOrgCurrentContact(contact))
      navigate(orgManageContactsUrls.view.viewContact)
    } else {
      const contactsToDelete = [contact]
      deleteDialog(contactsToDelete)
    }
  }

  const onMoreAction = (index) => {
    if (index === 0) {
      if (selectedContacts.length > 0) {
        const linkContacts = []
        selectedContacts.forEach((contact) => {
          linkContacts.push(contact.id)
        })

        if (selectedContacts.length === 1) {
          dispatch(setOrgCurrentContact(selectedContacts[0]))
        }

        navigate(orgManageLocationsUrls.view.dashboard, {
          state: {
            linkContacts,
            linkSource: 'dashboard'
          }
        })
      }
    } else if (index === 1) {
      deleteDialog(selectedContacts)
    }
  }

  const onPrint = (event) => {
    event.preventDefault()
    setContactsPerPage(null)
  }

  const onClickLinked = (type) => {
    const updatedFilteredContacts = contacts.filter(
      (contact) =>
        (type === 'linked' && contact.linked_locations.length > 0) ||
        (type === 'notLinked' && contact.linked_locations.length === 0)
    )

    let selectedFilterType = []
    if (type === 'linked') {
      selectedFilterType = 'Yes'
    } else {
      selectedFilterType = 'No'
    }

    setSelectedFilters([])
    setSelectedJobTitleFilters([])
    setSelectedKeywordFilters([])

    setSelectedLinkedFilters([selectedFilterType])
    setSelectedFilters([selectedFilterType])
    setIsFilterVisible(true)

    setFilteredContacts([...updatedFilteredContacts])

    setResetPaging(!resetPaging)
  }

  const onOpenCloseFilter = (event) => {
    event.preventDefault()
    setHoldPage(currentPage)
    setIsFilterVisible(!isFilterVisible)
  }

  const removeContacts = async (contactsToRemove) => {
    const updatedContacts = contacts.filter(
      (contact) => !contactsToRemove.includes(contact)
    )
    const updatedFilteredContacts = filteredContacts.filter(
      (contact) => !contactsToRemove.includes(contact)
    )

    const removeContactIDs = []
    contactsToRemove.forEach((contact) => {
      removeContactIDs.push(contact.id)
    })

    const dataToSend = { authToken, orgId, removeContactIDs }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/organization/remove_contacts',
      navigate
    )
    if (errorMessage) {
      console.log(errorMessage)
    }

    setContacts([...updatedContacts])
    setFilteredContacts([...updatedFilteredContacts])

    setNotificationText(deleteContactsText(contactsToRemove) + ' deleted')

    setDialog({ ...dialog, show: false })
    setTargetContact(null)
    setSelectedContacts([])

    setResetPaging(!resetPaging)
  }

  const handleDelete = async () => {
    if (targetContact) {
      await removeContacts([targetContact])
      if (selectedContacts.length > 0) {
        const updatedSelectedContacts = selectedContacts.filter(
          (contact) => contact !== targetContact
        )
        setSelectedContacts(updatedSelectedContacts)
      }
    } else if (selectedContacts.length > 0) {
      const contactsToRemove = [...selectedContacts]
      await removeContacts(contactsToRemove)
    }
  }

  const onOnlyShowSelected = (enabled) => {
    if (enabled) {
      setFilteredContacts(selectedContacts)
    } else {
      setFilteredContacts(contacts)
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
        {loading
          ? (
            <LoadingSpinner />
            )
          : (
            <>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-full'>
                  {notificationText && (
                    <NotificationBanner
                      className='govuk-notification-banner govuk-notification-banner--success'
                      title='Success'
                      text={notificationText}
                    />
                  )}
                  <DashboardHeader
                    contacts={contacts}
                    onClickLinked={onClickLinked}
                    linkLocations={location.state?.linkLocations}
                    selectedContacts={selectedContacts}
                    onOnlyShowSelected={onOnlyShowSelected}
                    linkSource={location.state?.linkSource}
                  />
                </div>
                <div className='govuk-grid-column-full govuk-body'>
                  {!isFilterVisible
                    ? (
                      <>
                        <Button
                          text='Open filter'
                          className='govuk-button govuk-button--secondary inline-block'
                          onClick={(event) => onOpenCloseFilter(event)}
                        />
                        {(!location.state ||
                      !location.state.linkLocations ||
                      location.state.linkLocations.length === 0) && (
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
                            onClick={(event) => onOpenCloseFilter(event)}
                          />
                        </>
                        )}
                        <UsersTable
                          contacts={contacts}
                          displayedContacts={displayedContacts}
                          filteredContacts={filteredContacts}
                          selectedContacts={selectedContacts}
                          setContacts={setContacts}
                          setSelectedContacts={setSelectedContacts}
                          setFilteredContacts={setFilteredContacts}
                          resetPaging={resetPaging}
                          setResetPaging={setResetPaging}
                          onAction={onAction}
                          actionText='Delete'
                          filterVisible={isFilterVisible}
                        />
                        {contactsPerPage && (
                          <Pagination
                            totalPages={Math.ceil(
                              filteredContacts.length / contactsPerPage
                            )}
                            onPageChange={(val) => setCurrentPage(val)}
                            holdPage={holdPage}
                            setHoldPage={setHoldPage}
                            pageList
                            reset={resetPaging}
                          />
                        )}
                      </>
                      )
                    : (
                      <div className='govuk-grid-row'>
                        <div className='govuk-grid-column-one-quarter govuk-!-padding-bottom-3'>
                          <SearchFilter
                            contacts={contacts}
                            setFilteredContacts={setFilteredContacts}
                            resetPaging={resetPaging}
                            setResetPaging={setResetPaging}
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                            contactNameFilter={contactNameFilter}
                            setContactNameFilter={setContactNameFilter}
                            selectedUserTypeFilters={selectedUserTypeFilters}
                            setSelectedUserTypeFilters={setSelectedUserTypeFilters}
                            selectedJobTitleFilters={selectedJobTitleFilters}
                            setSelectedJobTitleFilters={setSelectedJobTitleFilters}
                            selectedKeywordFilters={selectedKeywordFilters}
                            setSelectedKeywordFilters={setSelectedKeywordFilters}
                            selectedLinkedFilters={selectedLinkedFilters}
                            setSelectedLinkedFilters={setSelectedLinkedFilters}
                          />
                        </div>

                        <div className='govuk-grid-column-three-quarters'>
                          <div className='govuk-grid-row'>
                            <Button
                              text='Close Filter'
                              className='govuk-button govuk-button--secondary'
                              onClick={(event) => onOpenCloseFilter(event)}
                            />
                        &nbsp; &nbsp;
                            {(!location.state ||
                          !location.state.linkLocations ||
                          location.state.linkLocations.length === 0) && (
                            <>
                              <ButtonMenu
                                title='More actions'
                                options={moreActions}
                                onSelect={(index) => onMoreAction(index)}
                              />
                            &nbsp; &nbsp;
                              <Button
                                text='Print'
                                className='govuk-button govuk-button--secondary inline-block'
                                onClick={(event) => onPrint(event)}
                              />
                            </>
                            )}
                          </div>
                          <UsersTable
                            contacts={contacts}
                            displayedContacts={displayedContacts}
                            filteredContacts={filteredContacts}
                            selectedContacts={selectedContacts}
                            setContacts={setContacts}
                            setSelectedContacts={setSelectedContacts}
                            setFilteredContacts={setFilteredContacts}
                            resetPaging={resetPaging}
                            setResetPaging={setResetPaging}
                            onAction={onAction}
                            actionText='Delete'
                            filterVisible={isFilterVisible}
                          />
                          {contactsPerPage && (
                            <Pagination
                              totalPages={Math.ceil(
                                filteredContacts.length / contactsPerPage
                              )}
                              onPageChange={(val) => setCurrentPage(val)}
                              holdPage={holdPage}
                              setHoldPage={setHoldPage}
                              pageList
                              reset={resetPaging}
                            />
                          )}
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
                        defaultValue={dialog.input ? targetContact.name : ''}
                      />
                    </>
                  )}
                </div>
              </div>
            </>
            )}
      </main>
    </>
  )
}
