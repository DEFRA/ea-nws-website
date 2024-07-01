import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactReviewTable ({ profile, contactPreferences }) {
  const ShowEmailAddress = () => {
    return (
      <>
        {profile.emails.length > 0 || profile.unverified.emails.length > 0
          ? (
            <tbody className='govuk-table__body'>
              {profile.emails.map((email, index) => (
                <tr key={index} className='govuk-table__row'>
                  <td className='govuk-table__header govuk-!-width-one-half'>
                    By Email
                  </td>
                  <td className='govuk-table__cell govuk-!-width-full'>
                    {email}
                  </td>
                  <td className='govuk-table__cell' />
                  <td className='govuk-table__cell' />
                  {email !== profile.emails[0]
                    ? (
                      <td className='govuk-table__cell'>
                        <Link
                          to='/managecontacts/confirm-delete'
                          state={{
                            type: 'email',
                            contact: email,
                            navigateTo: '/signup/review'
                          }}
                          className='govuk-link'
                        >
                          Remove
                        </Link>
                      </td>
                      )
                    : (
                  // empty space in table without this
                      <td className='govuk-table__cell' />
                      )}
                </tr>
              ))}
              {profile.unverified.emails.map((unregisteredEmail, index) => (
                <tr key={index} className='govuk-table__row'>
                  <td className='govuk-table__header govuk-!-width-one-half'>
                    By Email
                  </td>
                  <td className='govuk-table__cell govuk-!-width-full'>
                    {unregisteredEmail}
                  </td>
                  <td className='govuk-table__cell'>
                    <strong className='govuk-tag govuk-tag--red'>
                      Unconfirmed
                    </strong>
                  </td>
                  <td className='govuk-table__cell' />
                  <td className='govuk-table__cell'>
                    <Link
                      to='/managecontacts/confirm-delete'
                      state={{
                        type: 'email',
                        contact: unregisteredEmail,
                        navigateTo: '/signup/review'
                      }}
                      className='govuk-link'
                    >
                      Remove
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            )
          : null}
      </>
    )
  }

  const ShowMobileNumber = () => {
    return (
      <>
        {profile.mobilePhones.length > 0 ||
        profile.unverified.mobilePhones.length > 0
          ? (
            <tbody className='govuk-table__body'>
              {profile.mobilePhones.map((mobilePhone, index) => (
                <tr key={index} className='govuk-table__row'>
                  <td className='govuk-table__header govuk-!-width-one-half'>
                    By text
                  </td>
                  <td className='govuk-table__cell govuk-!-width-full'>
                    {mobilePhone}
                  </td>
                  <td className='govuk-table__cell' />
                  <td className='govuk-table__cell' />
                  <td className='govuk-table__cell'>
                    <Link
                      to='/managecontacts/confirm-delete'
                      state={{
                        type: 'mobile telephone number',
                        contact: mobilePhone,
                        navigateTo: '/signup/review'
                      }}
                      className='govuk-link'
                    >
                      Remove
                    </Link>
                  </td>
                </tr>
              ))}
              {profile.unverified.mobilePhones.map(
                (unregisteredMobilePhone, index) => (
                  <tr key={index} className='govuk-table__row'>
                    <td className='govuk-table__header govuk-!-width-one-half'>
                      By text
                    </td>
                    <td className='govuk-table__cell govuk-!-width-full'>
                      {unregisteredMobilePhone}
                    </td>
                    <td className='govuk-table__cell'>
                      <strong className='govuk-tag govuk-tag--red'>
                        Unconfirmed
                      </strong>
                    </td>
                    <td className='govuk-table__cell' />
                    <td className='govuk-table__cell'>
                      <Link
                        to='/managecontacts/confirm-delete'
                        state={{
                          type: 'mobile telephone number',
                          contact: unregisteredMobilePhone,
                          navigateTo: '/signup/review'
                        }}
                        className='govuk-link'
                      >
                        Remove
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
            )
          : null}
      </>
    )
  }

  const ShowHomePhone = () => {
    return (
      <>
        {profile.homePhones.length > 0 ||
        profile.unverified.homePhones.length > 0
          ? (
            <tbody className='govuk-table__body'>
              {profile.homePhones.map((homePhone, index) => (
                <tr key={index} className='govuk-table__row'>
                  <td className='govuk-table__header govuk-!-width-one-half'>
                    By phone call
                  </td>
                  <td className='govuk-table__cell govuk-!-width-full'>
                    {homePhone}
                  </td>
                  <td className='govuk-table__cell' />
                  <td className='govuk-table__cell' />
                  <td className='govuk-table__cell'>
                    <Link
                      to='/managecontacts/confirm-delete'
                      state={{
                        type: 'telephone number',
                        contact: homePhone,
                        navigateTo: '/signup/review'
                      }}
                      className='govuk-link'
                    >
                      Remove
                    </Link>
                  </td>
                </tr>
              ))}
              {profile.unverified.homePhones.map(
                (unregisteredHomePhones, index) => (
                  <tr key={index} className='govuk-table__row'>
                    <td className='govuk-table__header govuk-!-width-one-half'>
                      By phone call
                    </td>
                    <td className='govuk-table__cell govuk-!-width-full'>
                      {unregisteredHomePhones}
                    </td>
                    <td className='govuk-table__cell'>
                      <strong className='govuk-tag govuk-tag--red'>
                        Unconfirmed
                      </strong>
                    </td>
                    <td className='govuk-table__cell' />
                    <td className='govuk-table__cell'>
                      <Link
                        to='/managecontacts/confirm-delete'
                        state={{
                          type: 'telephone number',
                          contact: unregisteredHomePhones,
                          navigateTo: '/signup/review'
                        }}
                        className='govuk-link'
                      >
                        Remove
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
            )
          : null}
      </>
    )
  }

  return (
    <>
      <h3 className='govuk-heading-m'>How you'll get flood messages</h3>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <ShowEmailAddress />
          {contactPreferences.includes('Text') ? <ShowMobileNumber /> : null}
          {contactPreferences.includes('PhoneCall') ? <ShowHomePhone /> : null}
        </tbody>
      </table>
    </>
  )
}
