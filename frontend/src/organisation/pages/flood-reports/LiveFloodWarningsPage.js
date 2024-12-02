import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../common/components/gov-uk/Button'
import Pagination from '../../../common/components/gov-uk/Pagination'
import FloodReportsTable from '../../components/custom/FloodReportsTable'
import { orgFloodReportsUrls } from '../../routes/flood-reports/FloodReportsRoutes'

export default function LiveFloodWarningsPage() {
  const navigate = useNavigate()
  const [warnings, setWarnings] = useState([])
  const [filteredWarnings, setFilteredWarnings] = useState([])
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [resetPaging, setResetPaging] = useState(false)
  const warningsPerPage = 10
  const displayedWarnings = filteredWarnings.slice(
    (currentPage - 1) * warningsPerPage,
    currentPage * warningsPerPage
  )

  // TODO: Integrate real warning data when available
  useEffect(() => {
    const w = [
      {
        name: 'Location_01',
        warningType: 'Flood warning',
        locationOrBoundaryType: 'Office',
        businessCriticality: 'High',
        linkedContacts: '-',
        lastUpdated: '2024-12-01 15:30:00'
      },
      {
        name: 'Location_02',
        warningType: 'Flood alert',
        locationOrBoundaryType: 'Office',
        businessCriticality: '-',
        linkedContacts: '-',
        lastUpdated: '2024-12-01 15:30:00'
      },
      {
        name: 'Location_03',
        warningType: 'Flood warning, Flood alert',
        locationOrBoundaryType: 'Unitary authority',
        businessCriticality: 'High',
        linkedContacts: '-',
        lastUpdated: '2024-12-01 15:30:00'
      },
      {
        name: 'Location_04',
        warningType: 'Flood warning',
        locationOrBoundaryType: 'Unitary authority',
        businessCriticality: '-',
        linkedContacts: '-',
        lastUpdated: '2024-12-01 15:30:00'
      },
      {
        name: 'Location_05',
        warningType: 'Flood warning, Flood alert',
        locationOrBoundaryType: 'County',
        businessCriticality: '-',
        linkedContacts: '-',
        lastUpdated: '2024-12-01 15:30:00'
      }
    ]
    setWarnings(w)
    setCurrentPage(1)
  }, [resetPaging])

  const table = (
    <>
      <Button
        text={isFilterVisible ? 'Close filter' : 'Open filter'}
        className='govuk-button govuk-button--secondary inline-block'
        onClick={() => setIsFilterVisible(!isFilterVisible)}
      />
      &nbsp; &nbsp;
      <Button
        text='Print'
        className='govuk-button govuk-button--secondary inline-block'
        onClick={() => window.print()}
      />
      <FloodReportsTable
        warnings={warnings}
        displayedWarnings={displayedWarnings}
        filteredLocations={filteredWarnings}
        setFilteredLocations={setFilteredWarnings}
        resetPaging={resetPaging}
        setResetPaging={setResetPaging}
      />
      <Pagination
        totalPages={Math.ceil(filteredWarnings.length / warningsPerPage)}
        onPageChange={(val) => setCurrentPage(val)}
      />
    </>
  )
  return (
    <>
      <OrganisationAccountNavigation
        currentPage={orgFloodReportsUrls.overview}
      />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <br />
            <h1 className='govuk-heading-l'>Live flood warnings</h1>
            <div className='govuk-grid-row'>
              <>{table}</>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
