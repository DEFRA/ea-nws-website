import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
import { setCurrentContact } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'

export default function ContactDetailsTable({
  contacts,
  contactTitle,
  contactType,
  primaryContact,
  unregisteredContact
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)

  const handleButton = (event) => {
    event.preventDefault()
    switch (contactType) {
      case 'email address':
        navigate('/managecontacts/add-email')
        break
      case 'mobile telephone number':
        navigate('/managecontacts/add-mobile')
        break
      case 'telephone number':
        navigate('/managecontacts/add-landline')
        break
    }
  }

  const triggerOtp = async (contactType, contactValue) => {
    let endpoint = ''
    let payload = {}

    switch (contactType) {
      case 'email address':
        endpoint = 'api/add_contact/email/add'
        payload = { authToken, email: contactValue }
        break
      case 'mobile telephone number':
        endpoint = 'api/add_contact/mobile/add'
        payload = { authToken, msisdn: contactValue }
        break
      case 'telephone number':
        endpoint = 'api/add_contact/landline/add'
        payload = { authToken, msisdn: contactValue }
        break
    }

    const { errorMessage } = await backendCall(payload, endpoint, navigate)
    return errorMessage
  }

  const UnconfirmedLink = ({ contact }) => {
    let nextPage

    switch (contactType) {
      case 'email address':
        nextPage = '/managecontacts/validate-email'
        break
      case 'mobile telephone number':
        nextPage = '/managecontacts/validate-mobile'
        break
      case 'telephone number':
        nextPage = '/managecontacts/validate-landline'
        break
    }

    return (
      <>
        <Link
          className='govuk-link right'
          onClick={async (e) => {
            e.preventDefault()
            dispatch(setCurrentContact(contact))

            const error = await triggerOtp(contactType, contact, authToken)
            if (!error) {
              navigate(nextPage)
            } else {
              console.error(error)
            }
          }}
          aria-label={`Confirm ${contact} as a verified contact`}
          style={{ cursor: 'pointer' }}
        >
          Confirm
        </Link>
      </>
    )
  }

  const MaximumReached = () => {
    if (contactType === 'email address') {
      return (
        <div>
          You've reached maximum of 5 {contactType.toLowerCase()}es.
          <br />
          <br />
        </div>
      )
    } else {
      return (
        <div>
          You've reached maximum of 5 {contactType.toLowerCase()}s for{' '}
          {contactTitle.toLowerCase()}.<br />
          <br />
        </div>
      )
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Details - Next Warning Service GOV.UK</title>
      </Helmet>
      <h3 className='govuk-heading-m'>{contactTitle}</h3>
      {(contacts.length > 0 || unregisteredContact.length) > 0 && (
        <table className='govuk-table'>
          <tbody className='govuk-table__body'>
            {contacts.map((contact, index) => (
              <tr key={index} className='govuk-table__row'>
                <td className='custom-table-cell govuk-table__cell'>
                  {contact}
                </td>
                {contact !== primaryContact ? (
                  <td className='custom-table-cell govuk-table__cell'>
                    <Link
                      to='/managecontacts/confirm-delete'
                      aria-label={`Remove ${contact} from your verified ${contactType} list`}
                      state={{
                        type: contactType,
                        contact
                      }}
                      className='govuk-link right'
                      style={{ cursor: 'pointer' }}
                    >
                      Remove
                    </Link>
                  </td>
                ) : (
                  <td className='govuk-table__cell' />
                )}
              </tr>
            ))}
            {unregisteredContact.map((unregisteredContact, index) => (
              <tr key={index} className='govuk-table__row'>
                <td className='custom-table-cell govuk-table__cell'>
                  {unregisteredContact.address}
                  <br />
                  <br />
                  <strong className='govuk-tag govuk-tag--red'>
                    Unconfirmed
                  </strong>
                </td>
                <td className='custom-table-cell govuk-table__cell'>
                  <Link
                    to='/managecontacts/confirm-delete'
                    aria-label={`Remove ${unregisteredContact.address} from your unverified ${contactType} list`}
                    state={{
                      type: contactType,
                      contact: unregisteredContact.address,
                      navigateTo: '/managecontacts'
                    }}
                    className='govuk-link right'
                    style={{ cursor: 'pointer' }}
                  >
                    Remove
                  </Link>
                  <br />
                  <br />
                  <UnconfirmedLink contact={unregisteredContact.address} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {contacts.length + unregisteredContact.length < 5 ? (
        <Button
          className='govuk-button govuk-button--secondary'
          text={`Add ${
            contactType === 'email address' ? 'an' : 'a'
          } ${contactType}`}
          onClick={handleButton}
        />
      ) : (
        <MaximumReached />
      )}
    </>
  )
}
