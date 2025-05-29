import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import { setOrgCurrentContact } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { webToGeoSafeContact } from '../../../../../common/services/formatters/ContactFormatter'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'

export default function PendingAdminsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const orgId = useSelector((state) => state.session.orgId)

  const [nameSort, setNameSort] = useState('none')
  const [statusSort, setStatusSort] = useState('none')

  const [pendingAdmins, setPendingAdmins] = useState([])

  const [successMessage] = useState(location.state?.successMessage) || ''

  useEffect(() => {
    const getPendingAdmins = async () => {
      const dataToSend = { orgId }
      const contactsData = await backendCall(
        dataToSend,
        'api/elasticache/list_contacts',
        navigate
      )

      const pendingAdminList = contactsData.data
        .filter((c) => c.pendingRole === 'ADMIN')
        // Randomly assign a status to each admin --- Mock value (should be removed at a later date)
        .map((admin) => ({
          ...admin,
          inviteStatus: Math.random() < 0.5 ? 'Expired' : 'Active'
        }))

      setPendingAdmins(pendingAdminList)
    }
    getPendingAdmins()
  }, [])

  const sortData = (sortType, setSort, key) => {
    const sorted = [...pendingAdmins]
    if (sortType === 'none' || sortType === 'descending') {
      setSort('ascending')
      sorted.sort((a, b) =>
        (a[key] || '').localeCompare(b[key] || '', undefined, {
          sensitivity: 'base'
        })
      )
    } else {
      setSort('descending')
      sorted.sort((a, b) =>
        (b[key] || '').localeCompare(a[key] || '', undefined, {
          sensitivity: 'base'
        })
      )
    }
    setPendingAdmins(sorted)
  }

  const viewAdmin = (e, admin) => {
    e.preventDefault()
    dispatch(setOrgCurrentContact(webToGeoSafeContact(admin)))
    navigate(orgManageContactsUrls.view.viewContact)
  }

  return (
    <>
      <Helmet>
        <title>Pending admins who still need to accept their invitation - Manage users - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
          {successMessage && (
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success'
              title='Success'
              heading={successMessage[0]}
              text={successMessage[1]}
            />
          )}
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l govuk-!-margin-top-3'>
              Pending admins who still need to accept their invitation
            </h1>
            <p className='govuk-!-margin-bottom-3 warnings-reports-paragraph'>
              {pendingAdmins.length} pending{' '}
              {pendingAdmins.length === 1 ? 'admin' : 'admins'}
            </p>{' '}
          </div>

          <table className='govuk-table govuk-table--small-text-until-tablet'>
            <thead className='govuk-table__head'>
              <tr className='govuk-table__row'>
                <th
                  scope='col'
                  className='govuk-table__header'
                  aria-sort={nameSort}
                >
                  <button
                    type='button'
                    onClick={() => sortData(nameSort, setNameSort, 'name')}
                  >
                    Pending admin name
                  </button>
                </th>
                <th
                  scope='col'
                  className='govuk-table__header'
                  aria-sort={statusSort}
                >
                  <button
                    type='button'
                    onClick={() =>
                      sortData(statusSort, setStatusSort, 'status')
                    }
                  >
                    Invitation status
                  </button>
                </th>
                <th scope='col' className='govuk-table__header' />
                <th scope='col' className='govuk-table__header' />
              </tr>
            </thead>
            <tbody className='govuk-table__body'>
              {pendingAdmins.map((admin, index) => (
                <tr key={index} className='govuk-table__row'>
                  <td className='govuk-table__cell'>
                    <Link
                      className='govuk-link'
                      onClick={(e) => viewAdmin(e, admin)}
                    >
                      {admin.firstname}
                      {admin?.lastname?.length > 0 ? ' ' + admin?.lastname : ''}
                    </Link>{' '}
                  </td>
                  <td className='govuk-table__cell'>
                    {admin.inviteStatus === 'Expired' ? (
                      <strong className='govuk-tag govuk-tag--orange govuk-!-margin-bottom-3'>
                        Expired
                      </strong>
                    ) : (
                      <strong className='govuk-tag govuk-tag--green govuk-!-margin-bottom-3'>
                        Active
                      </strong>
                    )}
                  </td>
                  <td className='govuk-table__cell'>
                    <Link
                      className='govuk-link'
                      to={orgManageContactsUrls.admin.resendInvite}
                      state={{ pendingAdmin: admin }}
                    >
                      Resend invitation
                    </Link>
                  </td>
                  <td className='govuk-table__cell'>
                    <Link
                      className='govuk-link'
                      to={orgManageContactsUrls.admin.withdrawInvite}
                      state={{ pendingAdmin: admin }}
                    >
                      Withdraw invitation
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
