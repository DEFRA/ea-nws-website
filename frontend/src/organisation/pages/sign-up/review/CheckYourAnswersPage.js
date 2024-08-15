import { React } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import AlternativeContactTable from './AlternativeContactTable'
import MainAdministratorTable from './MainAdministratorTable'
import OrganisationDetailsTable from './OrganisationDetailsTable'
export default function CheckYourAnswersPage() {
  const organisation = useSelector((state) => state.session.organisation)
  const profile = useSelector((state) => state.session.profile)

  const navigate = useNavigate()

  const handleButton = () => {
    navigate('/organisation/signup/success')
  }

  return (
    <>
      <BackLink to='/declaration' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row '>
          <div className='govuk-grid-column-three-quarters'>
            <h2 className='govuk-heading-l'>Check your answers</h2>
            <OrganisationDetailsTable organisation={organisation} />
            <MainAdministratorTable locations={profile} />
            <br />
            <AlternativeContactTable profile={profile} />
            <br />
          </div>
        </div>
        <Button
          onClick={handleButton}
          className='govuk-button'
          text='Finish sign up'
        />
      </main>
    </>
  )
}
