import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../../../../../common/components/gov-uk/Button'
import Details from '../../../../../../common/components/gov-uk/Details'
import LinkBanner from '../../../../../components/custom/LinkBanner'
import { urlManageContactsAdd } from '../../../../../routes/manage-contacts/ManageContactsRoutes'
import { urlManageKeywordsOrg } from '../../../../../routes/manage-keywords/ManageKeywordsRoutes'

export default function DashboardHeader ({
  contactsAdded,
  lastUpdated,
  contacts,
  onClickLinked,
  linkLocations,
  selectedContacts
}) {
  const navigate = useNavigate()

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
      heading = 'Contacts linked to locations'
      count =
        contacts.filter((item) => item.linked_locations.length > 0).length

      message = ' linked to locations'
    } else if (type === 'notLinked') {
      heading = 'Contacts not linked to locations'
      count =
        contacts.filter((item) => item.linked_locations.length === 0).length

      message = ' not linked to locations'
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
              <h1
                style={{ color: type === 'notLinked' ? 'crimson' : 'black' }}
              >
                <strong>{count}</strong>
              </h1>
              <Link className='govuk-link' onClick={() => onClickLinked(type)}>
                {Number(count) === 1 ? 'contact' : 'contacts'} {message}
              </Link>
            </>
          )}
        </div>

        <p className='govuk-!-margin-top-2'>
          {type === 'notLinked' && (
            <Details
              title='Linking locations to contacts so that they can get flood messages'
              text={noContactsDetails}
            />
          )}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className='govuk-grid-column-full govuk-body govuk-!-margin-top-6'>
        {!linkLocations || linkLocations.length === 0
          ? (
          <>
            <div style={{ display: 'flex' }}>
              <h1 className='govuk-heading-l'>
                Manage your organisation's {contacts.length} contacts
              </h1>
              <div style={{ marginLeft: 'auto' }}>
                <Button
                  text='Add contact'
                  className='govuk-button govuk-button--secondary'
                  onClick={() => navigate(urlManageContactsAdd)}
                />
                &nbsp; &nbsp;
                <Button
                  text='Manage keywords'
                  className='govuk-button govuk-button--secondary'
                  onClick={() => navigate(urlManageKeywordsOrg)}
                />
              </div>
            </div>
            <div style={{ display: 'flex', fontSize: '18px' }}>
              {contacts.filter((item) => item.linked_locations.length > 0).length > 0 && (
                <ContactsBanner type='linked' />
              )}
              {contacts.filter((item) => item.linked_locations.length === 0).length > 0 && (
                <ContactsBanner type='notLinked' />
              )}
            </div>
          </>
        )
        :
        (
          <>
            <h1 className='govuk-heading-l'>
              Link location to contacts
            </h1>
            <p>
              Select the contacts you want to link to this location from the list. Then select<br/>
              Link location to contacts.
            </p>
            <LinkBanner linkLocations={linkLocations} selectedContacts={selectedContacts}/>
          </>
        )}
    </div>
    </>
  )
}
