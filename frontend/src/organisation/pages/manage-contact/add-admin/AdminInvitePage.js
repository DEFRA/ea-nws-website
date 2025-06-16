import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import LoadingSpinner from '../../../../common/components/custom/LoadingSpinner'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import {
  setAuthToken,
  setContactPreferences,
  setOrgId,
  setOrganization,
  setProfile,
  setProfileId,
  setSigninType
} from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { orgInviteUrls } from '../../../routes/invite/InviteRoutes'

export default function AdminInvitePage() {
  const navigate = useNavigate()
  const location = useLocation()
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['authToken'])
  const dispatch = useDispatch()
  const [orgData, setOrgData] = useState(null)
  const [stage, setStage] = useState('Retrieving locations')
  const [error, setError] = useState('')

  const useQuery = () => {
    return new URLSearchParams(location.search)
  }

  const query = useQuery()

  useEffect(() => {
    if (orgData) {
      const startProcessing = async () => {
        const dataToSend = { orgData }
        await backendCall(dataToSend, 'api/org_signin', navigate)
      }
      startProcessing()
      const interval = setInterval(async function getStatus() {
        if (getStatus.isRunning) return
        getStatus.isRunning = true
        const dataToSend = { authToken: orgData.authToken }
        const { data, errorMessage } = await backendCall(
          dataToSend,
          'api/org_signin_status',
          navigate
        )
        if (data) {
          if (data?.stage !== stage) {
            setStage(data.stage)
          }
          if (data?.status === 'complete') {
            navigate(orgInviteUrls.admin.joined)
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
  }, [orgData])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const inviteToken = query.get('inviteToken')
    const dataToSend = { inviteToken }
    const { errorMessage, data } = await backendCall(
      dataToSend,
      'api/organization/validate_invitation',
      navigate
    )
    if (data) {
      setCookie('authToken', data.authToken)
      dispatch(setAuthToken(data.authToken))
      dispatch(setProfile(data.profile))
      dispatch(setProfileId(data.profile.id))
      dispatch(setOrgId(data.organization.id))
      dispatch(setOrganization(data.organization))
      dispatch(setSigninType('org'))
      dispatch(
        setContactPreferences([
          data.profile.emails.length !== 0 && 'Email Address',
          data.profile.homePhones.length !== 0 && 'PhoneCall',
          data.profile.mobilePhones.length !== 0 && 'Text'
        ])
      )
      if (data?.orgExists === 0) {
        setOrgData(data)
      } else {
        navigate(orgInviteUrls.admin.joined)
      }
    } else if (errorMessage) {
      console.log(errorMessage)
    }
  }

  return (
    <>
      <Helmet>
        <title>You've been invited to join as an admin for your organisation - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <main className='govuk-main-wrapper'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l' id='main-content'>
              You've been invited to join as an admin for your organisation
            </h1>
            <div className='govuk-!-margin-top-8'>
              <Button
                text='Accept invitation'
                className='govuk-button'
                onClick={(event) => {
                  handleSubmit(event)
                }}
              />
            </div>
          </div>
        </div>
      </main>
      {orgData && error === '' && (
        <div className='popup-dialog'>
          <div className='popup-dialog-container govuk-!-padding-bottom-6'>
            <LoadingSpinner
              loadingText={<p className='govuk-body-l'>{`${stage}...`}</p>}
            />
          </div>
        </div>
      )}
    </>
  )
}
