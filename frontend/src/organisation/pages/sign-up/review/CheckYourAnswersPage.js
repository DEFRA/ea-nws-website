import { React } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { getOrganisationAdditionals } from '../../../../common/services/ProfileServices'
import AlternativeContactTable from './AlternativeContactTable'
import MainAdministratorTable from './MainAdministratorTable'
import OrganisationDetailsTable from './OrganisationDetailsTable'
export default function CheckYourAnswersPage () {
  const profile = useSelector((state) => state.session.profile)
  const organisation = Object.assign({}, getOrganisationAdditionals(profile))

  const navigate = useNavigate()

  const handleButton = () => {
    // TODO once we have updated API
    // call to update profile with final profile here
    navigate('/organisation/sign-up/success')
  }

  return (
    <>
      {/* TODO - Should navigate back to Terms and Condition - Sprint 7 */}
      <BackLink to='/organisation/sign-up/alternative-contact' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row '>
          <h2 className='govuk-heading-l'>Check your answers</h2>
          <OrganisationDetailsTable organisation={organisation} />
          <MainAdministratorTable profile={profile} />
          <AlternativeContactTable
            alternativeContact={organisation.alternativeContact}
          />
          <Button
            onClick={handleButton}
            className='govuk-button'
            text='Finish and submit'
          />
        </div>
      </main>
    </>
  )
}
