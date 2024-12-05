import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Popup from '../../../../../common/components/custom/Popup'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import ButtonMenu from '../../../../../common/components/custom/ButtonMenu'
import Select from '../../../../../common/components/gov-uk/Select'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import DashboardHeader from './dashboard-components/DashboardHeader'
import ContactsTable from './dashboard-components/ContactsTable'
import SearchFilter from './dashboard-components/SearchFilter'
import { setCurrentContact, setContacts } from '../../../../../common/redux/userSlice'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'

export default function ViewContactsDashboardPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [notificationText, setNotificationText] = useState('')
  const [selectedContacts, setSelectedContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [targetContact, setTargetContact] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [displayedContacts, setDisplayedContacts] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([])
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

  const [updatedContact, setUpdatedContact] = useState('')
  const [results, setResults] = useState(null)
  const [searchInput, setSearchInput] = useState(null)
  const contactsPerPage = 10

  const contacts = useSelector((state) =>
    state.session.contacts !== null
      ? state.session.contacts
      : []
  )

  useEffect(() => {
    setFilteredContacts(contacts)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    setSelectedContacts([])
    setResults(null)
    setSearchInput('')
  }, [resetPaging])

  useEffect(() => {
    setDisplayedContacts(
      filteredContacts.slice(
        (currentPage - 1) * contactsPerPage,
        currentPage * contactsPerPage
      )
    )
  }, [filteredContacts, currentPage])

  const moreActions = [
    'Link selected to locations', 
    'Delete selected'
  ]

  // selected filters
  const [contactNameFilter, setContactNameFilter] =
    useState([])
  const [selectedJobTitleFilters, setSelectedJobTitleFilters] =
    useState([])
  const [selectedKeywordFilters, setSelectedKeywordFilters] =
    useState([])
  const [selectedLinkedFilters, setSelectedLinkedFilters] =
    useState([])

  const deleteDialog = (contactToBeDeleted) => {
    setDialog({
      show: true,
      text: (
        <>
          If you continue {contactToBeDeleted.name} will be deleted from this account and will 
          not get flood messages.
        </>
      ),
      title: 'Delete contact',
      buttonText: 'Delete contact',
      buttonClass: 'govuk-button--warning'
    })
  }

  const selectDeleteDialog = () => {
    if (selectedContacts && selectedContacts.length > 0) {
      setDialog({
        show: true,
        text: (
          <>
            If you continue {selectedContacts.length} {selectedContacts.length > 1 ? 'contacts' : 'contact'} will be deleted from this account and 
            will not get flood messages.
          </>
        ),
        title: `Delete ${selectedContacts.length} ${selectedContacts.length > 1 ? 'contacts' : 'contact'}`,
        buttonText: 'Delete contacts',
        buttonClass: 'govuk-button--warning'
      })
    }
  }

  const onAction = (e, action, contact) => {
    setTargetContact(contact)
    if (action === 'view') {
      e.preventDefault()
      dispatch(setCurrentContact(contact))
      navigate(orgManageContactsUrls.view.viewContact)
    } else {
      deleteDialog(contact)
    }
  }

  const onMoreAction = (index) => {
    if (index === 0) {
      // TODO
    }
    else if (index === 1) {
      selectDeleteDialog()
    }
  }

  const onClickLinked = (type) => {
    const updatedFilteredContacts = contacts.filter((contact) =>
      (type === 'linked' && contact.linked_locations.length > 0) ||
      (type === 'notLinked' && contact.linked_locations.length == 0)
    )

    let selectedFilterType = []
    if (type === 'linked') {
      selectedFilterType = 'Yes'
    }
    else {
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

  const removeContacts = (contactsToRemove) => {
    const updatedContacts = contacts.filter(
      (contact) => !contactsToRemove.includes(contact)
    )
    const updatedFilteredContacts = filteredContacts.filter(
      (contact) => !contactsToRemove.includes(contact)
    )

    dispatch(setContacts(updatedContacts))
    setContacts([...updatedContacts])
    setFilteredContacts([...updatedFilteredContacts])

    setNotificationText(contactsToRemove.length > 1 ? 'Contacts deleted' : 'Contact deleted')

    setDialog({ ...dialog, show: false })
    setTargetContact(null)
    setSelectedContacts([])

    setResetPaging(!resetPaging)
  }

  const handleDelete = () => {
    if (targetContact) {
      removeContacts([targetContact])
      if (selectedContacts.length > 0) {
        const updatedSelectedContacts = selectedContacts.filter(contact => contact !== targetContact)
        setSelectedContacts(updatedSelectedContacts)
      }
    } else if (selectedContacts.length > 0) {
      const contactsToRemove = [...selectedContacts]
      removeContacts(contactsToRemove)
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
            contacts={contacts}
            onClickLinked={onClickLinked}
          />
          <div className='govuk-grid-column-full govuk-body'>
            {!isFilterVisible ? (
              <>
                <Button
                  text='Open filter'
                  className='govuk-button govuk-button--secondary inline-block'
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                />
                &nbsp; &nbsp;
                <ButtonMenu
                  title={'More actions'}
                  options={moreActions}
                  onSelect={(index) => onMoreAction(index)}
                />
                &nbsp; &nbsp;
                <Button
                  text='Print'
                  className='govuk-button govuk-button--secondary inline-block'
                  // onClick={() => setIsFilterVisible(!isFilterVisible)}
                />
                <ContactsTable
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
                />
                <Pagination
                  totalPages={Math.ceil(
                    filteredContacts.length / contactsPerPage
                  )}
                  onPageChange={(val) => setCurrentPage(val)}
                  forcePage={currentPage}
                  pageList={true}
                />
              </>
            ) : (
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-one-quarter govuk-!-padding-bottom-3 contacts-filter-container'>
                <SearchFilter
                  contacts={contacts}
                  setFilteredContacts={setFilteredContacts}
                  resetPaging={resetPaging}
                  setResetPaging={setResetPaging}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  contactNameFilter={contactNameFilter}
                  setContactNameFilter={setContactNameFilter}
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
                        onClick={() => setIsFilterVisible(false)}
                      />
                      &nbsp; &nbsp;
                      <ButtonMenu
                        title={'More actions'}
                        options={moreActions}
                        onSelect={(index) => onMoreAction(index)}
                      />
                      &nbsp; &nbsp;
                      <Button
                        text='Print'
                        className='govuk-button govuk-button--secondary inline-block'
                        // onClick={() => setIsFilterVisible(!isFilterVisible)}
                      />
                    </div>
                  <ContactsTable
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
                  />
                  <Pagination
                    totalPages={Math.ceil(
                      filteredContacts.length / contactsPerPage
                    )}
                    onPageChange={(val) => setCurrentPage(val)}
                    forcePage={currentPage}
                    pageList={true}
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
                  defaultValue={dialog.input ? targetContact.name : ''}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
