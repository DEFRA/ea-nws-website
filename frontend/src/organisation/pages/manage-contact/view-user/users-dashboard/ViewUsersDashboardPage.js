import moment from 'moment'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import ButtonMenu from '../../../../../common/components/custom/ButtonMenu'
import LoadingSpinner from '../../../../../common/components/custom/LoadingSpinner'
import Popup from '../../../../../common/components/custom/Popup'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import { setOrgCurrentContact } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { geoSafeToWebContact } from '../../../../../common/services/formatters/ContactFormatter'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { useFetchAlerts } from '../../../../../common/services/hooks/GetHistoricalAlerts'
import UsersTable from '../../../../components/custom/UsersTable'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import DashboardHeader from './dashboard-components/DashboardHeader'
import SearchFilter from './dashboard-components/SearchFilter'

export default function ViewUsersDashboardPage() {
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
  const profileId = useSelector((state) => state.session.profileId)
  const [contactsPerPage, setContactsPerPage] = useState(defaultContactsPerPage)
  const [dialog, setDialog] = useState({
    show: false,
    text: <></>,
    title: <></>,
    buttonText: '',
    buttonClass: '',
    input: '',
    charLimit: 0,
    error: '',
    infoOnly: false
  })
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const historyData = useFetchAlerts()
  const [activeAdmins, setActiveAdmins] = useState([])
  const toggleFilterButtonRef = useRef(null)
  const adminIds = useMemo(
    () => new Set(activeAdmins.map((a) => a.id)),
    [activeAdmins]
  )

  useEffect(() => {
    if (toggleFilterButtonRef.current) {
      toggleFilterButtonRef.current.focus()
    }
  }, [isFilterVisible])

  async function getActiveAdmins() {
    const { data } = await backendCall(
      { authToken },
      'api/elasticache/get_active_admins'
    )
    setActiveAdmins(data)
  }

  useEffect(() => {
    getActiveAdmins()
  }, [])

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
      const contactsData = await backendCall(
        { authToken },
        'api/elasticache/list_contacts',
        navigate
      )
      const contactsUpdate = []
      if (contactsData.data) {
        contactsData.data.forEach((contact) => {
          contactsUpdate.push(geoSafeToWebContact(contact))
        })
      }

      contactsUpdate.forEach(async (contact) => {
        const contactsDataToSend = { authToken, contactId: contact.id }
        const { data } = await backendCall(
          contactsDataToSend,
          'api/elasticache/list_linked_locations',
          navigate
        )

        contact.linked_locations = data.length || 0
        contact.message_count = 0
        if (data && data.length > 0) {
          data.forEach(async function (location) {
            const floodAreas = await getWithinAreas(
              geoSafeToWebLocation(location)
            )
            if (floodAreas && floodAreas.length > 0) {
              for (const area of floodAreas) {
                contact.message_count += getHistoricalData(
                  area.TA_CODE,
                  historyData
                ).length
              }
            }
          })
        }
      })

      // Sort objects by contact name alphabetically
      contactsUpdate.sort((a, b) => {
        const first = (a.firstname || '').localeCompare(
          b.firstname || '',
          undefined,
          { sensitivity: 'base' }
        )
        if (first !== 0) return first

        // If first names match, compare second names
        return (a.lastname || '').localeCompare(b.lastname || '', undefined, {
          sensitivity: 'base'
        })
      })

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
    return location?.additionals?.other?.targetAreas || []
  }

  const getHistoricalData = (taCode, floodHistoryData) => {
    const floodCount = []
    const twoYearsAgo = moment().subtract(2, 'years')
    if (taCode && floodHistoryData) {
      const filteredData = floodHistoryData.filter(
        (alert) =>
          alert.CODE === taCode &&
          moment(alert.effectiveDate * 1000) > twoYearsAgo
      )
      floodCount.push(filteredData.length)
    }
    return floodCount
  }

  const deleteContactsNotification = (contactsToBeDeleted) => {
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

  const deleteContactsText = (
    toDelete,
    activeAdminsNotRemoved,
    selfRemoved
  ) => {
    let text = ''
    if (toDelete.length > 0) {
      const defaultText = (
        <>
          If you continue,{' '}
          {toDelete.length === 1 ? (
            <>
              {toDelete[0].firstname +
                (toDelete[0].lastname.length > 0
                  ? ' ' + toDelete[0].lastname
                  : '')}{' '}
              will be deleted from this account.
            </>
          ) : (
            <>they'll be deleted from this account.</>
          )}
          <br />
          <br />
          They'll no longer get flood messages, if they were receiving any.
        </>
      )
      text = defaultText

      if (activeAdminsNotRemoved.length > 0) {
        const notDeleteTotal = activeAdminsNotRemoved.length
        text = (
          <>
            {defaultText}
            <div className='govuk-inset-text'>
              <strong>
                You cannot delete {notDeleteTotal} user
                {notDeleteTotal > 1 ? 's' : ''}
              </strong>
              <br />
              <br />
              {activeAdminsNotRemoved.length} user
              {activeAdminsNotRemoved.length > 1 ? 's are' : ' is'} currently
              using the service and cannot be deleted.
              {selfRemoved && (
                <>
                  <br />
                  <br />
                  It’s not possible to delete your own profile - another
                  administrator must do this for you.
                </>
              )}
            </div>
          </>
        )
      } else if (selfRemoved) {
        text = (
          <>
            {defaultText}
            <div className='govuk-inset-text'>
              <strong>You cannot delete your own profile</strong>
              <br />
              <br />
              It’s not possible to delete your own profile - another
              administrator must do this for you.
            </div>
          </>
        )
      }
    } else if (toDelete.length === 0) {
      if (activeAdminsNotRemoved.length > 0) {
        text = (
          <>
            {activeAdminsNotRemoved.length} user
            {activeAdminsNotRemoved.length > 1 ? 's are' : ' is'} currently
            using the service and cannot be deleted.
            {selfRemoved && (
              <>
                <br />
                <br />
                It’s not possible to delete your own profile - another
                administrator must do this for you.
              </>
            )}
          </>
        )
      } else if (selfRemoved) {
        text = <>Another administrator must do this for you.</>
      }
    }
    return text
  }

  const deleteContactsTitle = (
    toDelete,
    activeAdminsNotRemoved,
    selfRemoved
  ) => {
    const numNotDelete = activeAdminsNotRemoved.length
    let title = ''
    if (toDelete.length > 0) {
      if (numNotDelete > 0) {
        title = (
          <>
            Delete {toDelete.length} of {toDelete.length + numNotDelete} users
          </>
        )
      } else {
        title = (
          <>
            Delete {toDelete.length > 1 ? `${toDelete.length} users` : 'user'}
          </>
        )
      }
    } else if (toDelete.length === 0) {
      if (activeAdminsNotRemoved.length > 0) {
        title = (
          <>
            You cannot delete {numNotDelete} user{numNotDelete > 1 ? 's' : ''}
          </>
        )
      } else if (selfRemoved) {
        title = <>You cannot delete your own profile</>
      }
    }

    return title
  }
  const deleteDialog = (contactsToBeDeleted) => {
    const toDelete = contactsToBeDeleted.filter((c) => !adminIds.has(c.id))
    const activeAdminsNotRemoved = contactsToBeDeleted.filter(
      (c) => adminIds.has(c.id) && c.id !== profileId
    )
    const selfRemoved = activeAdminsNotRemoved.some((c) => c.id === profileId)

    if (contactsToBeDeleted && contactsToBeDeleted.length > 0) {
      setDialog({
        show: true,
        text: deleteContactsText(toDelete, activeAdminsNotRemoved, selfRemoved),
        title: deleteContactsTitle(
          toDelete,
          activeAdminsNotRemoved,
          selfRemoved
        ),
        buttonText: `Delete ${toDelete.length > 1 ? 'users' : 'user'}`,
        buttonClass: 'govuk-button--warning',
        infoOnly: toDelete.length === 0
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

    const dataToSend = { authToken, removeContactIDs }
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

    setNotificationText([
      deleteContactsNotification(contactsToRemove) + ' deleted'
    ])

    setDialog({ ...dialog, show: false })
    setTargetContact(null)
    setSelectedContacts([])

    setResetPaging(!resetPaging)
  }

  const handleDelete = async () => {
    if (targetContact) {
      if (adminIds.has(targetContact.id)) {
        // Re-invoke deleteDialog to show the "you can't delete this admin" message
        deleteDialog([targetContact])
        return
      }
      await removeContacts([targetContact])
      if (selectedContacts.length > 0) {
        const updatedSelectedContacts = selectedContacts.filter(
          (contact) => contact !== targetContact
        )
        setSelectedContacts(updatedSelectedContacts)
      }
    } else if (selectedContacts.length > 0) {
      const toDelete = selectedContacts.filter((el) => !adminIds.has(el.id))
      const contactsToRemove = [...toDelete]
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

  const renderActionButtons = () => (
    <div className='govuk-grid-row'>
      <div className='govuk-grid-column-full'>
        <Button
          text={isFilterVisible ? 'Close filter' : 'Open filter'}
          className='govuk-button govuk-button--secondary inline-block'
          onClick={(event) => onOpenCloseFilter(event)}
          ref={toggleFilterButtonRef}
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
    </div>
  )

  return (
    <>
      <Helmet>
        <title>
          Manage your organisation's users - Manage users - Get flood warnings
          (professional) - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={navigateBack} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-full'>
                {notificationText && (
                  <NotificationBanner
                    className='govuk-notification-banner govuk-notification-banner--success'
                    title='Success'
                    heading={
                      notificationText.length === 2 ? notificationText[0] : null
                    }
                    text={
                      notificationText.length === 2
                        ? notificationText[1]
                        : notificationText[0]
                    }
                  />
                )}
                {errorMessage && <ErrorSummary errorList={[errorMessage]} />}
                <DashboardHeader
                  contacts={contacts}
                  onClickLinked={onClickLinked}
                  linkLocations={location.state?.linkLocations}
                  selectedContacts={selectedContacts}
                  onOnlyShowSelected={onOnlyShowSelected}
                  linkSource={location.state?.linkSource}
                  setErrorMessage={setErrorMessage}
                />
              </div>
              <div className='govuk-grid-column-full govuk-body'>
                {!isFilterVisible ? (
                  <>
                    {renderActionButtons()}
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
                ) : (
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
                      {renderActionButtons()}
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
                        setDialog((dial) => ({ ...dial, error: val }))
                      }
                      defaultValue={dialog.input ? targetContact.name : ''}
                      infoOnly={dialog.infoOnly}
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
