import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import InsetText from '../../../common/components/gov-uk/InsetText'

export default function SignUpDuplicateEmailPageLayout () {
  const location = useLocation()

  return (
    <>
      <Helmet>
        <title>Account already exists - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink to='/organisation/sign-up' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              An account already exists for this organisation
            </h1>
            <InsetText text={location.state.name} />
            <div className='govuk-body'>
              <p>
                If you need to create a new account, email us at tbc@domain.com
                with your:
              </p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>name</li>
                <li>organisation's name</li>
                <li>telephone number</li>
              </ul>
              <p>We'll get back to you within 2 to 3 working days.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
