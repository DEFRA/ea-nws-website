import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
import UserContactType from '../../../common/enums/UserContactType'
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
      case UserContactType.Email:
        navigate('/managecontacts/add-email')
        break
      case UserContactType.Mobile:
        navigate('/managecontacts/add-mobile')
        break
      case UserContactType.Telephone:
        navigate('/managecontacts/add-landline')
        break
    }
  }

  const handleContactSelection = async (contact) => {
    let nextPage, endpoint, payload
    dispatch(setCurrentContact(contact))

    switch (contactType) {
      case UserContactType.Email:
        nextPage = '/managecontacts/validate-email'
        endpoint = 'api/add_contact/email/add'
        payload = { authToken, email: contact }
        break
      case UserContactType.Mobile:
        nextPage = '/managecontacts/validate-mobile'
        endpoint = 'api/add_contact/mobile/add'
        payload = { authToken, msisdn: contact }
        break
      case UserContactType.Telephone:
        nextPage = '/managecontacts/validate-landline'
        endpoint = 'api/add_contact/landline/add'
        payload = { authToken, msisdn: contact }
        break
    }
    const { errorMessage } = await backendCall(payload, endpoint, navigate)

    if (!errorMessage) {
      navigate(nextPage)
    }
  }

  const MaximumReached = () => {
    if (contactType === UserContactType.Email) {
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

  const getLabel = (contact, arrayLength, index, type) => {
    let confirmLabel, removeLabel
    const contactLabel = `${
      arrayLength > 1 && index ? `${index} - ` : ''
    }${contact}`

    switch (contactType) {
      case UserContactType.Email:
        confirmLabel = `Confirm email address ${contactLabel} to receive warnings for this address`
        removeLabel = `Remove email address ${contactLabel} to stop warnings for this address`
      case UserContactType.Mobile:
        confirmLabel = `Confirm mobile number ${contactLabel} to receive text warnings to this number`
        removeLabel = `Remove mobile number ${contactLabel} to stop text warnings to this number`
      case UserContactType.Telephone:
        confirmLabel = `Confirm telephone number ${contactLabel} to receive phone call warnings to this number`
        removeLabel = `Remove telephone number ${contactLabel} to stop phone call warnings to this number`
    }

    if (type === 'confirm') {
      return confirmLabel
    } else {
      return removeLabel
    }
  }

  return (
    <>
      <h3 className='govuk-heading-m'>{contactTitle}</h3>
      {(contacts.length > 0 || unregisteredContact.length) > 0 && (
        <table className='govuk-table'>
          <tbody className='govuk-table__body'>
            {contacts.map((contact, index) => (
              <tr
                key={`verified-${contactType}-${index}`}
                className='govuk-table__row'
              >
                <td className='custom-table-cell govuk-table__cell'>
                  {contact}
                </td>
                {contact !== primaryContact ? (
                  <td className='custom-table-cell govuk-table__cell'>
                    <Link
                      to='/managecontacts/confirm-delete'
                      state={{
                        type: contactType,
                        contact
                      }}
                      className='govuk-link right'
                      style={{ cursor: 'pointer' }}
                      aria-label={getLabel(
                        contact,
                        contacts.length,
                        index,
                        'remove'
                      )}
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
              <tr
                key={`unverified-${contactType}-${index}`}
                className='govuk-table__row'
              >
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
                    state={{
                      type: contactType,
                      contact: unregisteredContact.address,
                      navigateTo: '/managecontacts'
                    }}
                    className='govuk-link right'
                    style={{ cursor: 'pointer' }}
                    aria-label={getLabel(
                      unregisteredContact.address,
                      unregisteredContact.length,
                      index,
                      'remove'
                    )}
                  >
                    Remove
                  </Link>
                  <br />
                  <br />
                  <Link
                    className='govuk-link right'
                    onClick={async (e) => {
                      e.preventDefault()
                      handleContactSelection(unregisteredContact.address)
                    }}
                    style={{ cursor: 'pointer' }}
                    aria-label={getLabel(
                      unregisteredContact.address,
                      unregisteredContact.length,
                      index,
                      'confirm'
                    )}
                  >
                    Confirm
                  </Link>
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
            contactType === UserContactType.Email ? 'an' : 'a'
          } ${contactType}`}
          onClick={handleButton}
        />
      ) : (
        <MaximumReached />
      )}
    </>
  )
}
