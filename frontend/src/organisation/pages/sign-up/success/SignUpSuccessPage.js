import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BackLink from '../../../../common/components/custom/BackLink'
import ConfirmationPanel from '../../../../common/components/gov-uk/Panel'
import { backendCall } from '../../../../common/services/BackendService'
import { useEffect } from 'react'
export default function SignUpSuccessPage () {
  // need to check for authToken
  const navigate = useNavigate()
  const organization = useSelector((state) => state.session.organization)
  const orgCurrentContact = useSelector((state) => state.session.orgCurrentContact)
  async function notifySignUpSuccessEa () {
    // add in the rest of the data
    const dataToSend = {
      email: orgCurrentContact.emails[0],
      refNumber: 1, // will need to change
      orgName: organization.description.name,
      address: organization.description.address,
      companyHouseNumber: organization.description.compHouseNum,
      professionalPartner: '', // will need to change
      fullName: orgCurrentContact.firstname + ' ' + orgCurrentContact.lastname,
      alternavtiveContactFullName: organization.description.alternativeContact.firstName + ' ' + organization.description.alternativeContact.lastName,
      alternavtiveContactEmail: organization.description.alternativeContact.email,
      alternavtiveContactTelephone: organization.description.alternativeContact.telephone,
      alternavtiveContactJob: organization.description.alternativeContact.jobTitle,
      submissionDateTime: 'tuesday' // change
    }
    await backendCall(dataToSend, '/api/notify/account_pending_ea', navigate)
  }

  async function notifySignUpSuccessOrg () {
    // add in the rest of the data
    const dataToSend = {
      email: orgCurrentContact.emails[0],
      refNumber: 1, // will need to change
      orgName: organization.description.name,
      address: organization.description.address,
      companyHouseNumber: organization.description.compHouseNum,
      professionalPartner: '', // will need to change
      fullName: orgCurrentContact.firstname + ' ' + orgCurrentContact.lastname,
      alternavtiveContactFullName: organization.description.alternativeContact.firstName + ' ' + organization.description.alternativeContact.lastName,
      alternavtiveContactEmail: organization.description.alternativeContact.email,
      alternavtiveContactTelephone: organization.description.alternativeContact.telephone,
      alternavtiveContactJob: organization.description.alternativeContact.jobTitle,
      eaEmail: 'exampleEA@email.com' // change
    }
    await backendCall(dataToSend, '/api/notify/account_pending_org', navigate)
  }

  useEffect(() => {
    notifySignUpSuccessEa()
    notifySignUpSuccessOrg()
  }, [])

  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <BackLink onClick={() => navigate(-1)} />
            <ConfirmationPanel title='Organisation details submitted for approval' />
            <div className='govuk-body govuk-!-margin-top-6'>
              <h1 className='govuk-heading-m govuk-!-margin-top-6'>
                What happens next
              </h1>
              <p className='govuk-!-margin-top-6'>
                We'll check the details you've submitted so we can verify your
                organisation.
              </p>
              <p className='govuk-!-margin-top-6'>
                This usually takes 2 to 3 working days.
              </p>
              <p className='govuk-!-margin-top-6'>
                Once approved, we will email you and explain how the service can
                be accessed.
              </p>
              <h1 className='govuk-heading-m govuk-!-margin-top-6'>
                Help us improve this service
              </h1>
              <p className='govuk-!-margin-top-6'>
                <Link to='/signup/feedback' className='govuk-link'>
                  What do you think of the service?
                </Link>
                &nbsp; (takes 30 seconds)
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
