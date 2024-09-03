import { React } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { getOrganisationAdditionals } from '../../../../common/services/ProfileServices'
import AlternativeContactTable from './AlternativeContactTable'
import MainAdministratorTable from './MainAdministratorTable'
import OrganisationDetailsTable from './OrganisationDetailsTable'
export default function CheckYourAnswersPage() {
  const profile = useSelector((state) => state.session.profile.additionals)
  let organisation = Object.assign({}, getOrganisationAdditionals(profile))

  // TODO - laurent or cammy to update this page with correct data

  const navigate = useNavigate()

  const handleButton = () => {
    // call to update profile with final profile here
    navigate('/organisation/signup/success')
  }

  return (
    <>
      <BackLink to='/declaration' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row '>
          <h2 className='govuk-heading-l'>Check your answers</h2>
          <OrganisationDetailsTable Organisation={organisation} />
          <MainAdministratorTable Profile={profile} />
          <AlternativeContactTable
            AlternativeContact={organisation.AlternativeContact}
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
