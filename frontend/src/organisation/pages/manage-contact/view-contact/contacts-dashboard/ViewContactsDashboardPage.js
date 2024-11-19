import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import Select from '../../../../../common/components/gov-uk/Select'
import Pagination from '../../../../../common/components/gov-uk/Pagination'
import DashboardHeader from './dashboard-components/DashboardHeader'
import ContactsTable from './dashboard-components/ContactsTable'
import SearchFilter from './dashboard-components/SearchFilter'

export default function ViewContactsDashboardPage () {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  useEffect(() => {
    const c = [
      {
        name: 'Stephanie Beach',
        job_title: 'Operations Director',
        email: 'stephanie.beach@company.com',
        linked_locations: ['Loc_1', 'Loc_2']
      },
      {
        name: 'Mary Pepper',
        job_title: 'Regional Manager',
        email: 'mary.pepper@company.com',
        linked_locations: []
      },
      {
        name: 'Amanda Jordan',
        job_title: 'Regional Manager',
        email: 'amanda.jordan@company.com',
        linked_locations: ['Loc_3', 'Loc_4']
      },
      {
        name: 'Steve Binns',
        job_title: 'Regional Manager',
        email: 'steve.binns@company.com',
        linked_locations: ['Loc_1']
      },
      {
        name: 'Greg Swordy',
        job_title: 'Site Manager',
        email: 'greg.swordy@company.com',
        linked_locations: ['Loc_1', 'Loc_2']
      },
    ]
    setContacts(c)
    setFilteredContacts(c)
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const contactsPerPage = 10
  const displayedContacts = filteredContacts.slice(
    (currentPage - 1) * contactsPerPage,
    currentPage * contactsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
    setSelectedContacts([])
  }, [resetPaging])

  const moreActions = [
    'Link selected to locations', 
    'Delete selected'
  ]

  // selected filters
  const [selectedJobTitleFilters, setSelectedJobTitleFilters] =
    useState([])
  const [selectedEmailFilters, setSelectedEmailFilters] =
    useState([])

  const onMoreActionSelected = (event) => {
    
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
                    onSelect={onMoreActionSelected}
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
                    onSelect={onMoreActionSelected}
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
          </div>
        </div>
      </main>
    </>
  )
}
