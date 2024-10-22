import React from 'react'
import BackLink from '../../../../common/components/custom/BackLink'
import MainAdministratorTable from '../../sign-up/review/MainAdministratorTable'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
export default function ManageAdmindetailsPage () {
    //WIP page
    const profile = useSelector((state) => state.session.profile)
    const navigate = useNavigate()

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
      <div className='govuk-grid-row '>
        <h2 className='govuk-heading-m'>Manage administratir details</h2>
        <h3 className='govuk-heading-s'>Contact details</h3>
      </div>
      </main>
    </>
  )
}
