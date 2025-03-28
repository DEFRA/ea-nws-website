import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../../../../../common/components/gov-uk/Button'
import Details from '../../../../../../common/components/gov-uk/Details'
import { clearOrgCurrentContact } from '../../../../../../common/redux/userSlice'
import LinkBanner from '../../../../../components/custom/LinkBanner'
import {
  orgManageContactsUrls,
  urlManageContactsAdd
} from '../../../../../routes/manage-contacts/ManageContactsRoutes'
import { urlManageKeywordsOrg } from '../../../../../routes/manage-keywords/ManageKeywordsRoutes'

export default function DashboardHeader({
  contacts,
  onClickLinked,
  linkLocations,
  selectedContacts,
  onOnlyShowSelected,
  linkSource
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const noContactsDetails = (
    <>
      <p>
        If no flood warnings or flood alerts are available for a location you
        may be able to link to nearby flood areas that get them.
      </p>

      <p>
        To link locations to nearby flood areas, go to an individual location
        screen then link to nearby flood areas in the Flood areas and message
        setting section.
      </p>
    </>
  )

  const ContactsBanner = ({ type }) => {
    let count = ''
    let message = ''
    let heading = ''

    if (type === 'linked') {
      heading = 'Users linked to locations'
      count = contacts.filter(
        (item) => item.linked_locations?.length > 0
      ).length

      message = ' linked to locations'
    } else if (type === 'notLinked') {
      heading = 'Users not linked to locations'
      count = contacts.filter(
        (item) => item.linked_locations?.length === 0
      ).length

      message = ' not linked to locations'
    } else if (type === 'pendingAdmins') {
      heading = 'Pending admins who have not accepted invitation'
      count = contacts.filter((item) => item.pendingRole === 'Admin').length

      message = ' pending admins'
    }

    return (
      <div
        className='govuk-!-margin-top-1'
        style={{
          width: '100%',
          paddingRight: type === 'linked' ? '1rem' : ''
        }}
      >
        <p>
          <strong>{heading}</strong>
        </p>
        <div
          style={{
            border: '2px solid lightGrey',
            padding: '1.5rem 1.5rem'
          }}
        >
          {(type === 'linked' || type === 'notLinked') && (
            <>
              <h1 style={{ color: type === 'notLinked' ? 'crimson' : 'black' }}>
                <strong>{count}</strong>
              </h1>
              <Link className='govuk-link' onClick={() => onClickLinked(type)}>
                {Number(count) === 1 ? 'user' : 'users'} {message}
              </Link>
            </>
          )}
          {type === 'pendingAdmins' && (
            <>
              <h1>
                <strong>{count}</strong>
              </h1>
              <Link
                className='govuk-link'
                onClick={() =>
                  navigate(orgManageContactsUrls.admin.pendingInvites)
                }
              >
                pending admins
              </Link>
            </>
          )}
        </div>

        <p className='govuk-!-margin-top-2'>
          {type === 'notLinked' && (
            <Details
              title='How to link users to locations so they can get flood messages'
              text={noContactsDetails}
            />
          )}
          {type === 'pendingAdmins' && (
            <Link
              onClick={() => navigate('#')}
              className='govuk-body govuk-link inline-link'
            >
              Manage pending admin invitations
            </Link>
          )}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className='govuk-body govuk-!-margin-top-6'>
        {!linkLocations || linkLocations.length === 0 ? (
          <>
            <div style={{ display: 'flex' }}>
              <h1 className='govuk-heading-l'>
                Your organisation's users ({contacts.length})
              </h1>
              <div style={{ marginLeft: 'auto' }}>
                <Button
                  text='Add new user'
                  className='govuk-button govuk-button--secondary'
                  onClick={(event) => {
                    event.preventDefault()
                    dispatch(clearOrgCurrentContact())
                    navigate(urlManageContactsAdd)
                  }}
                />
                &nbsp; &nbsp;
                <Button
                  text='Manage keywords'
                  className='govuk-button govuk-button--secondary'
                  onClick={(event) => {
                    event.preventDefault()
                    navigate(urlManageKeywordsOrg, {
                      state: { type: 'contact' }
                    })
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', fontSize: '18px' }}>
              {contacts.filter((item) => item.linked_locations?.length > 0)
                .length > 0 && <ContactsBanner type='linked' />}
              {contacts.filter((item) => item.linked_locations?.length === 0)
                .length > 0 && <ContactsBanner type='notLinked' />}
              {contacts.filter((item) => item.pendingRole === 'Admin').length >
                0 && <ContactsBanner type='pendingAdmins' />}
            </div>
          </>
        ) : (
          <>
            <h1 className='govuk-heading-l'>Link location to users</h1>
            <p>
              Select the users you want to link to this location from the list.
              Then select
              <br />
              Link location to users.
            </p>
            <LinkBanner
              linkLocations={linkLocations}
              selectedContacts={selectedContacts}
              onOnlyShowSelected={onOnlyShowSelected}
              linkSource={linkSource}
            />
          </>
        )}
      </div>
    </>
  )
}
