import { React } from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import AlternativeContactTable from './AlternativeContactTable'
import MainAdministratorTable from './MainAdministratorTable'
import OrganisationDetailsTable from './OrganisationDetailsTable'
export default function CheckYourAnswersPage() {
  // need to get org details from profiles additionals
  // const profile = useSelector((state) => state.session.profile.additionals)

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
          <OrganisationDetailsTable />
          <MainAdministratorTable />
          <AlternativeContactTable />
          <Button
            onClick={handleButton}
            className='govuk-button'
            text='Finish and submit'
          />
        </div>
        <Button
          onClick={handleButton}
          className='govuk-button'
          text='Finish and submit'
        />
      </main>
    </>
  )
}
