import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import { backendCall } from '../../../common/services/BackendService'

export default function HelpAndGuidancePage () {
  const navigate = useNavigate()
  const [templateUrl, setTemplateUrl] = useState(null)

  async function getGuideUrl() {
    const { data } = await backendCall('data', 'api/info/download_guide')
    setTemplateUrl(data)
  }

  useEffect(() => {
    getGuideUrl()
  }, [])

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
          <a className='govuk-link ' href={templateUrl}>
            Get flood warnings - quick start guide
          </a>
        </div>
      </main>
    </>
  )
}
