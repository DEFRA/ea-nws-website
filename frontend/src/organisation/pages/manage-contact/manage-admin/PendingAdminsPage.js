import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import { setOrgCurrentContact } from '../../../../common/redux/userSlice'
import { webToGeoSafeContact } from '../../../../common/services/formatters/ContactFormatter'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function PendingAdminsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const [nameSort, setNameSort] = useState('none')
  const [statusSort, setStatusSort] = useState('none')

  const [pendingAdmins, setPendingAdmins] = useState(
    location.state?.pendingAdmins || []
  )

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
    navigate(orgManageContactsUrls.view.viewContact, {
      state: {
        userType: 'Pending admin'
      }
    })
  }

  const handleResend = () => {}

  const handleWithdraw = () => {}

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
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
                <th scope='col' className='govuk-table__header'></th>
                <th scope='col' className='govuk-table__header'></th>
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
                  <td className='govuk-table__cell'>PLACEHOLDER</td>
                  <td className='govuk-table__cell'>
                    <Link className='govuk-link' onClick={handleResend}>
                      Resend invitation
                    </Link>
                  </td>
                  <td className='govuk-table__cell'>
                    <Link className='govuk-link' onClick={handleWithdraw}>
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
