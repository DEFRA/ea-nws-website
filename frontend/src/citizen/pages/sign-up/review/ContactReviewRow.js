import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactReviewRow({
  contact,
  contactType,
  isConfirmed,
  emailIndex
}) {
  const rowDetails = () => {
    let titleRow
    let confirmLink
    let showDelete = true

    switch (contactType) {
      case 'homePhone':
        titleRow = 'By phone call'
        confirmLink = isConfirmed ? '' : '/signup/review/validate-landline'
        break
      case 'mobilePhone':
        titleRow = 'By text'
        confirmLink = isConfirmed ? '' : '/signup/review/validate-mobile'
        break
      case 'email':
        titleRow = 'By email'
        confirmLink = isConfirmed ? '' : '/signup/review/validate-email'
        showDelete = emailIndex !== 0
        break
      default:
        break
    }
    return { titleRow, confirmLink, showDelete }
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
            aria-label={`Remove ${contact} from your verified ${contactType} list`}
            tabIndex='0' // Ensuring keyboard focus works
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
              tabIndex='0' // Ensuring keyboard focus works
              aria-label={`Confirm ${contact}`}
            >
              Confirm
            </Link>
          </>
        )}
      </td>
    </tr>
  )
}
