import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../../common/components/custom/LoadingSpinner"
import ErrorSummary from "../../../common/components/gov-uk/ErrorSummary"
import { backendCall } from "../../../common/services/BackendService"
import { getAdditionals } from "../../../common/services/ProfileServices"
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

    useEffect(() => {
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
                      Your Account is being Migrated
                    </h1>
                    <LoadingSpinner
                      loadingText={<p className='govuk-body-l'>{`${stage}...`}</p>}
                      percent={percent}
                      wide={true}
                    />
                    <div className='govuk-body'>
                      <p>Your account is currently being migrated. do not leave this page. You will be redirected to the service once migration is complete</p>
                    </div>
                  </div>
                </div>
              </main>
        </>
      )
}