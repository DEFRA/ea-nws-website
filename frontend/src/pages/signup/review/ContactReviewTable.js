import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ContactReviewTable({ profile }) {
  const navigate = useNavigate()
  const ShowEmailAddress = () => {
    if (profile.emails[0]) {
      return (
        <>
          <tr className='govuk-table__row'>
            <td scope='row' class='govuk-table__header  govuk-!-width-one-half'>
              By email
            </td>
            <td className='govuk-table__cell govuk-!-width-full'>
              {profile.emails[0]}
            </td>
            <td className='govuk-table__cell'></td>
            <td className='govuk-table__cell'></td>
            <td className='govuk-table__cell'>
              <Link
                to='/managecontacts/confirm-delete'
                state={{
                  type: 'email',
                  contact: profile.emails[0]
                }}
                className='govuk-link'
              >
                Remove
              </Link>
            </td>
          </tr>
        </>
      )
    } else if (profile.unverified.emails[0]) {
      return (
        <>
          <tr className='govuk-table__row'>
            <td scope='row' class='govuk-table__header  govuk-!-width-one-half'>
              By email
            </td>
            <td className='govuk-table__cell govuk-!-width-full'>
              {profile.emails[0]}
            </td>
            <td className='govuk-table__cell'>
              <strong className='govuk-tag govuk-tag--red'>Unconfirmed</strong>
            </td>
            <td className='govuk-table__cell'>
              <Link to='/managecontacts/validate-email' className='govuk-link'>
                Confirm
              </Link>
            </td>
            <td className='govuk-table__cell'>
              <Link
                to='/managecontacts/confirm-delete'
                state={{
                  type: 'email',
                  contact: profile.unverified.emails[0]
                }}
                className='govuk-link'
              >
                Remove
              </Link>
            </td>
          </tr>
        </>
      )
    }
    return (
      <>
        <tr className='govuk-table__row'>
          <td scope='row' class='govuk-table__header  govuk-!-width-one-half'>
            By email
          </td>
          <td className='govuk-table__cell govuk-!-width-full'></td>
          <td className='govuk-table__cell'></td>
          <td className='govuk-table__cell'></td>
          <td className='govuk-table__cell'></td>
        </tr>
      </>
    )
  }
  const ShowMobileNumber = () => {
    if (profile.mobilePhones[0]) {
      return (
        <>
          <tr className='govuk-table__row'>
            <td scope='row' class='govuk-table__header  govuk-!-width-one-half'>
              By text
            </td>
            <td className='govuk-table__cell govuk-!-width-full'>
              {profile.mobilePhones[0]}
            </td>
            <td className='govuk-table__cell'></td>
            <td className='govuk-table__cell'></td>
            <td className='govuk-table__cell'>
              <Link
                to='/managecontacts/confirm-delete'
                state={{
                  type: 'mobile',
                  contact: profile.mobilePhones[0]
                }}
                className='govuk-link'
              >
                Remove
              </Link>
            </td>
          </tr>
        </>
      )
    } else if (profile.unverified.mobilePhones[0]) {
      return (
        <>
          <tr className='govuk-table__row'>
            <td scope='row' class='govuk-table__header  govuk-!-width-one-half'>
              By text
            </td>
            <td className='govuk-table__cell govuk-!-width-full'>
              {profile.emails[0]}
            </td>
            <td className='govuk-table__cell'>
              <strong className='govuk-tag govuk-tag--red'>Unconfirmed</strong>
            </td>
            <td className='govuk-table__cell'>
              <Link to='/managecontacts/validate-mobile' className='govuk-link'>
                Confirm
              </Link>
            </td>
            <td className='govuk-table__cell'>
              <Link
                to='/managecontacts/confirm-delete'
                state={{
                  type: 'mobile',
                  contact: profile.unverified.mobilePhones[0]
                }}
                className='govuk-link'
              >
                Remove
              </Link>
            </td>
          </tr>
        </>
      )
    }
    return (
      <>
        <tr className='govuk-table__row'>
          <td scope='row' class='govuk-table__header  govuk-!-width-one-half'>
            By text
          </td>
          <td className='govuk-table__cell govuk-!-width-full'></td>
          <td className='govuk-table__cell'></td>
          <td className='govuk-table__cell'></td>
          <td className='govuk-table__cell'></td>
        </tr>
      </>
    )
  }

  const ShowHomePhone = () => {
    if (profile.homePhones[0]) {
      return (
        <>
          <tr className='govuk-table__row'>
            <td scope='row' class='govuk-table__header  govuk-!-width-one-half'>
              By phone call
            </td>
            <td className='govuk-table__cell govuk-!-width-full'>
              {profile.homePhones[0]}
            </td>
            <td className='govuk-table__cell'></td>
            <td className='govuk-table__cell'></td>
            <td className='govuk-table__cell'>
              <Link
                to='/managecontacts/confirm-delete'
                state={{
                  type: 'homephone',
                  contact: profile.homePhones[0]
                }}
                className='govuk-link'
              >
                Remove
              </Link>
            </td>
          </tr>
        </>
      )
    } else if (profile.unverified.homePhones[0]) {
      return (
        <>
          <tr className='govuk-table__row'>
            <td scope='row' class='govuk-table__header  govuk-!-width-one-half'>
              By phone call
            </td>
            <td className='govuk-table__cell govuk-!-width-full'>
              {profile.homePhones[0]}
            </td>
            <td className='govuk-table__cell'>
              <strong className='govuk-tag govuk-tag--red'>Unconfirmed</strong>
            </td>
            <td className='govuk-table__cell'>
              <Link
                to='/managecontacts/validate-landline'
                className='govuk-link'
              >
                Confirm
              </Link>
            </td>
            <td className='govuk-table__cell'>
              <Link
                to='/managecontacts/confirm-delete'
                state={{
                  type: 'homephone',
                  contact: profile.unverified.homePhones[0]
                }}
                className='govuk-link'
              >
                Remove
              </Link>
            </td>
          </tr>
        </>
      )
    }
    return (
      <>
        <tr className='govuk-table__row'>
          <td scope='row' class='govuk-table__header  govuk-!-width-one-half'>
            By phone call
          </td>
          <td className='govuk-table__cell govuk-!-width-full'></td>
          <td className='govuk-table__cell'></td>
          <td className='govuk-table__cell'></td>
          <td className='govuk-table__cell'></td>
        </tr>
      </>
    )
  }

  return (
    <>
      <h3 className='govuk-heading-m'>How you'll get flood messages</h3>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <ShowEmailAddress />
          <ShowMobileNumber />
          <ShowHomePhone />
        </tbody>
      </table>
    </>
  )
}
