import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'

export default function HelpAndGuidancePage() {
  const navigate = useNavigate()

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>
          Help and Guidance - Get flood warnings (professional) - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-column'>
          <h1
            className='govuk-heading-l govuk-!-margin-bottom-8'
            id='main-content'
          >
            Help and Guidance
          </h1>
          <h3 className='govuk-heading-s govuk-!-margin-bottom-6'>
            You can download a quick-start guide
          </h3>
          <p className='govuk-!-margin-bottom-6'>
            This will guide you through the steps to set up your account.
          </p>
          <Link className='govuk-link'>
            Get flood warnings - quick start guide
          </Link>
        </div>
      </main>
    </>
  )
}
