import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BackLink from '../../../../common/components/custom/BackLink'
import ConfirmationPanel from '../../../../common/components/gov-uk/Panel'
import { backendCall } from '../../../../common/services/BackendService'
import { useEffect } from 'react'

export default function SignUpSuccessPage () {
  // need to check for authToken
  const navigate = useNavigate()
  const profile = useSelector((state) => state.session.profile)
  const organization = useSelector((state) => state.session.organization)
  const organizationAdditionals = JSON.parse(organization.description)
  const responderValue = organizationAdditionals.emergencySector? "yes" : "no"
  

  async function notifySignUpSuccessEa () {
    const submissionDateTime = new Date().toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).replace('AM', 'am').replace('PM', 'pm')

    const dataToSend = {
      email: profile.emails[0],
      refNumber: organization.id,
      orgName: organizationAdditionals.name,
      address: organizationAdditionals.address,
      companyHouseNumber: 'no',
      responder: responderValue,
      fullName: profile.firstname + ' ' + profile.lastname,
      alternativeContactFullName: organizationAdditionals.alternativeContact.firstName + ' ' + organizationAdditionals.alternativeContact.lastName,
      alternativeContactEmail: organizationAdditionals.alternativeContact.email,
      alternativeContactTelephone: organizationAdditionals.alternativeContact.telephone,
      alternativeContactJob: organizationAdditionals.alternativeContact.jobTitle,
      submissionDateTime:submissionDateTime
    }
    await backendCall(dataToSend, 'api/notify/account_pending_ea', navigate)
  }



  async function notifySignUpSuccessOrg () {
    
    const dataToSend = {
      // ToDo change the eaEmail to their email once confirmed
      email: profile.emails[0],
      refNumber: organization.id,
      orgName: organizationAdditionals.name,
      address: organizationAdditionals.address,
      companyHouseNumber: 'no',
      responder: responderValue,
      fullName: profile.firstname + ' ' + profile.lastname,
      alternativeContactFullName: organizationAdditionals.alternativeContact.firstName + ' ' + organizationAdditionals.alternativeContact.lastName,
      alternativeContactEmail: organizationAdditionals.alternativeContact.email,
      alternativeContactTelephone: organizationAdditionals.alternativeContact.telephone,
      alternativeContactJob: organizationAdditionals.alternativeContact.jobTitle,
      eaEmail: 'exampleEA@email.com' 
    }
    await backendCall(dataToSend, 'api/notify/account_pending_org', navigate)
  }



  useEffect(() => {
    async function sendNotifications() {
      await notifySignUpSuccessEa();
      await notifySignUpSuccessOrg();
    }
    sendNotifications();
  }, []);

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
