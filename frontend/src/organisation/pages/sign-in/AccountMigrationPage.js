import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../../../common/components/custom/LoadingSpinner"
import ErrorSummary from "../../../common/components/gov-uk/ErrorSummary"
import { backendCall } from "../../../common/services/BackendService"
import { getAdditionals } from "../../../common/services/ProfileServices"
import { infoUrls } from "../../routes/info/InfoRoutes"
import { orgManageLocationsUrls } from "../../routes/manage-locations/ManageLocationsRoutes"

export default function AccountMigrationPage () {
    const organization = useSelector((state) => state.session.organization)
    const authToken = useSelector((state) => state.session.authToken)
    const profile = useSelector((state) => state.session.profile)

    const [stage, setStage] = useState('Retrieving locations')
    const [percent, setPercent] = useState(null)
    const [error, setError] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['authToken'])

    const navigate = useNavigate()

    const [templateUrl, setTemplateUrl] = useState(null)

    async function getGuideUrl() {
      const { data } = await backendCall('data', 'api/info/download_guide')
      setTemplateUrl(data)
    }

    useEffect(() => {
      getGuideUrl()
        if (organization && authToken) {
          const interval = setInterval(async function getStatus() {
            if (getStatus.isRunning) return
            getStatus.isRunning = true
            const dataToSend = { authToken }
            const { data, errorMessage } = await backendCall(
              dataToSend,
              'api/org_signin_migrated_status',
              navigate
            )
            if (data) {
              if (data?.stage !== stage) {
                setStage(data.stage)
              }
              if (data?.percent) {
                setPercent(data.percent)
              } else {
                setPercent(null)
              }
              if (data?.status === 'complete') {
                // once complete set the cookie so user isn't timed out
                setCookie('authToken', authToken)
                const isAdminUsersFirstLogin = getAdditionals(
                  profile,
                  'firstLogin'
                )
                if (isAdminUsersFirstLogin === 'true') {
                  navigate('/sign-in/organisation/admin-controls')
                } else {
                  navigate(orgManageLocationsUrls.monitoring.view)
                }
              }
            }
            if (errorMessage) {
              setError(errorMessage)
            }
            getStatus.isRunning = false
          }, 2000)
          return () => {
            clearInterval(interval)
          }
        }
      }, [])

      return (
        <>
          <Helmet>
            <title>Account migration - Get flood warnings - GOV.UK</title>
          </Helmet>
              <main className='govuk-main-wrapper govuk-!-padding-top-4'>
                <div className='govuk-grid-row'>
                  <div className='govuk-grid-column-two-thirds'>
                    {error && (
                      <ErrorSummary
                        errorList={[{ text: error }]}
                      />
                    )}
                    <h1 className='govuk-heading-l' id='main-content'>
                      Your account is being migrated
                    </h1>
                    <LoadingSpinner
                      loadingText={<p className='govuk-body-l'>{`${stage}...`}</p>}
                      percent={percent}
                      wide={true}
                    />
                    <div className='govuk-body'>
                      <p>
                        This is the first time your organisation is being signed into the new professional get flood warnings service.
                        Your account is currently being migrated.
                      </p>
                      <div class="govuk-warning-text">
                        <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
                        <strong class="govuk-warning-text__text">
                          <span class="govuk-visually-hidden">Warning</span>
                          Do not refresh the page. You will be automatically redirected once complete.
                        </strong>
                        </div>
                        <h2 className='govuk-heading-m'>
                          Learn more about the service
                        </h2>
                        <p>
                        <Link
                              className='govuk-link'
                              to={infoUrls.preview}
                              target='_blank'
                              aria-label='Preview what the professional service offers'
                            >
                              Preview what the professional service offers
                            </Link> {' '}(opens in new tab)
                        </p>
                        <p>
                          <a className='govuk-link ' href={templateUrl} target='_blank' rel='noopener noreferrer'>
                            Get flood warnings - quick start guide
                          </a>
                        </p>
                    </div>
                  </div>
                </div>
              </main>
        </>
      )
}