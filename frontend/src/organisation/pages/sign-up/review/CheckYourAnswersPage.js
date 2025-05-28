import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { updateAdditionals } from '../../../../common/services/ProfileServices'
import AlternativeContactTable from './AlternativeContactTable'
import MainAdministratorTable from './MainAdministratorTable'
import OrganisationDetailsTable from './OrganisationDetailsTable'
import { orgSignUpUrls } from '../../../routes/sign-up/SignUpRoutes'

export default function CheckYourAnswersPage () {
  const profile = useSelector((state) => state.session.profile)
  const organization = useSelector((state) => state.session.organization)
  const organizationAdditionals = JSON.parse(organization.description)
  const authToken = useSelector((state) => state.session.authToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleButton = async (event) => {
    event.preventDefault()
    // TODO once we have updated API
    // call to update profile with final profile here
    const dataToSend = { organization, authToken }
    await backendCall(dataToSend, 'api/organization/update', navigate)

    const updatedProfile = updateAdditionals(profile, [
      { id: 'signupComplete', value: { s: 'pending' } },
      { id: 'lastAccessedUrl', value: { s: '/organisation/sign-up/success' } }
    ])
    dispatch(setProfile(updatedProfile))

    const profileDataToSend = {
      profile: updatedProfile,
      authToken,
      signinType: 'org'
    }
    await backendCall(profileDataToSend, 'api/profile/update', navigate)

    navigate(orgSignUpUrls.success)
  }

  return (
    <>
      <Helmet>
        <title>Check Your Answers - GOV.UK</title>
      </Helmet>
      <BackLink to='/organisation/sign-up/declaration' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row '>
          <h2 className='govuk-heading-l'>Check your answers</h2>
          <OrganisationDetailsTable organisation={organizationAdditionals} />
          <MainAdministratorTable profile={profile} />
          <AlternativeContactTable
            alternativeContact={organizationAdditionals.alternativeContact}
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
