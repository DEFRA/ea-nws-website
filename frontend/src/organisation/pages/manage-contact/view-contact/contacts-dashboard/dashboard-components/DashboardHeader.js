import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../../../../../common/components/gov-uk/Button'
import Details from '../../../../../../common/components/gov-uk/Details'
import { urlManageKeywordsOrg } from '../../../../../routes/manage-keywords/ManageKeywordsRoutes'
import { urlManageContactsAdd } from '../../../../../routes/manage-contacts/ManageContactsRoutes'

export default function DashboardHeader ({
  ContactsAdded,
  LastUpdated,
  contacts
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
    const count = []
    const message = []
    const heading = []

    if (type === 'linked') {
      heading[0] = 'Contacts linked to locations'
      count.push(
        contacts.filter((item) => item.linked_locations.length > 0).length
      )
      message[0] = ' linked to locations'
    } else if (type === 'notLinked') {
      heading[0] = 'Contacts not linked to locations'
      count.push(
        contacts.filter((item) => item.linked_locations.length == 0).length
      )
      message[0] = ' not linked to locations'
    }

    return (
      <div
        className='govuk-!-margin-top-1'
        style={{
          width: '100%',
          padding: '0.5rem 0.5rem'
          // Set a minimum height for the outer container
          // display: 'flex', // Use flexbox to handle inner content better
          // flexDirection: 'column' // Ensure the inner content is stacked vertically
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
                <strong>{count[0]}</strong>
              </h1>
              <Link className='govuk-link'>
                {count[0] === 1 ? 'contact' : 'contacts'} {message[0]}
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
          <ContactsBanner type='linked' />
          <ContactsBanner type='notLinked' />
        </div>
      </div>
    </>
  )
}