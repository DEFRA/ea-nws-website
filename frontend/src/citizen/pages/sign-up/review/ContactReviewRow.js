import React from 'react'
import { Link } from 'react-router-dom'
import UserContactType from '../../../../common/enums/UserContactType'

export default function ContactReviewRow({
  contact,
  contactType,
  isConfirmed,
  emailIndex,
  arrayLength,
  index
}) {
  const rowDetails = () => {
    const contactLabel = `${arrayLength > 1 ? `${index + 1} - ` : ''}${contact}`
    const confirmedLink =
      isConfirmed &&
      `/signup/review/validate-${
        contactType === UserContactType.Telephone ? 'landline' : contactType
      }`

    const contactTypeMap = {
      [UserContactType.Telephone]: {
        titleRow: 'By phone call',
        confirmLabel: `Confirm telephone number ${contactLabel}, for phone call warnings`,
        removeLabel: `Remove telephone number ${contactLabel}, for phone call warnings`
      },
      [UserContactType.Mobile]: {
        titleRow: 'By text',
        confirmLabel: `Confirm mobile number ${contactLabel}, for text warnings`,
        removeLabel: `Remove mobile number ${contactLabel}, for text warnings`
      },
      [UserContactType.Email]: {
        titleRow: 'By email',
        confirmLabel: `Confirm email ${contactLabel}, for email warnings`,
        removeLabel: `Remove email ${contactLabel}, for email warnings`
      }
    }

    const details = contactTypeMap[contactType] || {}

    return {
      titleRow: details.titleRow || '',
      confirmLink: confirmedLink,
      confirmLinkLabel: details.confirmLabel || '',
      removeLinkLabel: details.removeLabel || '',
      showDelete:
        contactType === UserContactType.Email ? emailIndex !== 0 : true
    }
  }

  const details = rowDetails()

  return (
    <tr className='govuk-table__row'>
      <th className='govuk-table__header text-nowrap' scope='row'>
        {details.titleRow}
      </th>
      <td className='custom-table-cell govuk-table__cell'>
        {contact}
        {!isConfirmed && (
          <>
            <br />
            <br />
            <strong className='govuk-tag govuk-tag--red'>Unconfirmed</strong>
          </>
        )}
      </td>
      <td className='custom-table-cell govuk-table__cell'>
        {details.showDelete && (
          <Link
            role='button'
            to='/signup/review/remove-contact'
            state={{
              type: contactType,
              contact
            }}
            className='govuk-link right'
            style={{ cursor: 'pointer' }}
            id={`remove-${contactType}-${emailIndex ?? contact}`}
            aria-label={rowDetails().removeLinkLabel}
            tabIndex='0'
          >
            Remove
          </Link>
        )}
        {!isConfirmed && (
          <>
            <br />
            <br />
            <Link
              to={details.confirmLink}
              className='govuk-link right'
              style={{ cursor: 'pointer' }}
              id={`confirm-${contactType}-${emailIndex ?? contact}`}
              tabIndex='0'
              aria-label={rowDetails().confirmLinkLabel}
            >
              Confirm
            </Link>
          </>
        )}
      </td>
    </tr>
  )
}
