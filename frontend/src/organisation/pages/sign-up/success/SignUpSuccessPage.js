import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ConfirmationPanel from '../../../../common/components/gov-uk/Panel'
import { backendCall } from '../../../../common/services/BackendService'

export default function SignUpSuccessPage() {
  // need to check for authToken
  const navigate = useNavigate()
  const profile = useSelector((state) => state.session.profile)
  const authToken = useSelector((state) => state.session.authToken)
  const organization = useSelector((state) => state.session.organization)
  const organizationAdditionals = JSON.parse(organization.description)
  const responderValue = organizationAdditionals.emergencySector ? 'yes' : 'no'
  const jobTitle =
    organizationAdditionals.alternativeContact.jobTitle.trim() || '-'
  const compHouseNum = organizationAdditionals.compHouseNum ?? '-'
  const [servicePhase, setServicePhase] = useState(false)
  const [eaEmail, setEAEmail] = useState(null)

  async function notifySignUpSuccessEa() {
    const submissionDateTime = new Date()
      .toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      .replace('AM', 'am')
      .replace('PM', 'pm')

    const dataToSend = {
      email: eaEmail,
      adminEmail: profile.emails[0],
      orgName: organizationAdditionals.name,
      address: organizationAdditionals.address,
      companyHouseNumber: compHouseNum,
      responder: responderValue,
      fullName: profile.firstname + ' ' + profile.lastname,
      alternativeContactFullName:
        organizationAdditionals.alternativeContact.firstName +
        ' ' +
        organizationAdditionals.alternativeContact.lastName,
      alternativeContactEmail: organizationAdditionals.alternativeContact.email,
      alternativeContactTelephone:
        organizationAdditionals.alternativeContact.telephone,
      alternativeContactJob: jobTitle,
      submissionDateTime,
      authToken
    }
    await backendCall(dataToSend, 'api/notify/account_pending_ea', navigate)
  }

  async function notifySignUpSuccessOrg() {
    const dataToSend = {
      email: profile.emails[0],
      refNumber: organization.id,
      orgName: organizationAdditionals.name,
      address: organizationAdditionals.address,
      companyHouseNumber: compHouseNum,
      responder: responderValue,
      fullName: profile.firstname + ' ' + profile.lastname,
      alternativeContactFullName:
        organizationAdditionals.alternativeContact.firstName +
        ' ' +
        organizationAdditionals.alternativeContact.lastName,
      alternativeContactEmail: organizationAdditionals.alternativeContact.email,
      alternativeContactTelephone:
        organizationAdditionals.alternativeContact.telephone,
      alternativeContactJob: jobTitle,
      eaEmail
    }
    await backendCall(dataToSend, 'api/notify/account_pending_org', navigate)
  }

  useEffect(() => {
    const getEAEmail = async () => {
      const { data } = await backendCall('data', 'api/service/get_ea_email')
      setEAEmail(data)
    }

    const getServicePhase = async () => {
      const { data } = await backendCall(
        'data',
        'api/service/get_service_phase'
      )
      setServicePhase(data)
    }

    getEAEmail()
    getServicePhase()
  }, [])

  useEffect(() => {
    if (eaEmail) {
      notifySignUpSuccessEa()
      notifySignUpSuccessOrg()
    }
  }, [eaEmail])

  return (
    <>
      <Helmet>
        <title>
          Organisation details submitted for approval - Get flood warnings
          (professional) - GOV.UK
        </title>
      </Helmet>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <BackLink onClick={() => navigate(-1)} />
            <div aria-label='sign up success confirmation' id='main-content'>
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
                  This usually takes 3-5 days.
                </p>
                <p className='govuk-!-margin-top-6'>
                  Once approved, we will email you and explain how the service
                  can be accessed.
                </p>
                {servicePhase !== 'beta' && (
                  <div>
                    <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                      Help us improve this service
                    </h2>
                    <p className='govuk-!-margin-top-6'>
                      <Link to='/signup/feedback' className='govuk-link'>
                        What do you think of the service?
                      </Link>
                      &nbsp; (takes 30 seconds)
                    </p>
                  </div>
                )}
                {servicePhase === 'beta' && (
                  <div>
                    <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                      Now answer some questions about the sign up process
                    </h2>
                    <Button
                      text='Continue'
                      className='govuk-button'
                      onClick={() => navigate('/signup/feedback')}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
