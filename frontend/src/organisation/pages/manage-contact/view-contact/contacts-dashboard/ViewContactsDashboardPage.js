import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Popup from '../../../../../common/components/custom/Popup'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import Select from '../../../../../common/components/gov-uk/Select'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
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

  useEffect(() => {
    setContacts(contacts)
    setFilteredContacts(contacts)
  }, [contacts])

  const [selectedOption, setSelectedOption] = useState([
    {
      label: "Banana",
      value: "b",
    },
  ]);

  const moreActions = [
    'Link selected to locations', 
    'Delete selected'
  ]

  // selected filters
  const [selectedJobTitleFilters, setSelectedJobTitleFilters] =
    useState([])
  const [selectedEmailFilters, setSelectedEmailFilters] =
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
      buttonClass: 'govuk-button--warning',
      input: ''
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
        buttonClass: 'govuk-button--warning',
        input: ''
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

  const onMoreAction = (action) => {
    if (action === 'Link selected to locations') {

    }
    else if (action === 'Delete selected') {
      selectDeleteDialog()
    }
    
  }

  const removeContacts = (contactsToRemove) => {
    const updatedContacts = contacts.filter(
      (contact) => !contactsToRemove.includes(contact)
    )

    dispatch(setContacts(updatedContacts))
    setContacts([...updatedContacts])

    setNotificationText('Contact deleted')

    setDialog({ ...dialog, show: false })
    setTargetContact(null)
    setSelectedContacts([])
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

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <DashboardHeader contacts={contacts} />
          <div className='govuk-grid-column-full govuk-body'>
            {!isFilterVisible ? (
              <>
                <Button
                  text='Open filter'
                  className='govuk-button govuk-button--secondary inline-block'
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                />
                &nbsp; &nbsp;
                <Select
                    name='MoreActions'
                    label=''
                    options={moreActions}
                    // onSelect={() => selectDeleteDialog()}
                    onSelect={(e) => onMoreAction(e)}
                    initialSelectOptionText={
                      'More actions'
                    }
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
                  selectedJobTitleFilters={selectedJobTitleFilters}
                  setSelectedJobTitleFilters={setSelectedJobTitleFilters}
                  selectedEmailFilters={selectedEmailFilters}
                  setSelectedEmailFilters={setSelectedEmailFilters}
                />
                </div>

                <div className='govuk-grid-column-three-quarters'>
                  <Button
                    text='Close Filter'
                    className='govuk-button govuk-button--secondary'
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                  />
                  &nbsp; &nbsp;
                  <Select
                    name='MoreActions'
                    label=''
                    options={moreActions}
                    onSelect={() => selectDeleteDialog()}
                    initialSelectOptionText={
                      'More actions'
                    }
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
                  />
                  <Pagination
                    totalPages={Math.ceil(
                      filteredContacts.length / contactsPerPage
                    )}
                    onPageChange={(val) => setCurrentPage(val)}
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
                  input={dialog.input}
                  textInput={updatedContact}
                  setTextInput={setUpdatedContact}
                  charLimit={dialog.charLimit}
                  error={dialog.error}
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
