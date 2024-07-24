import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../gov-uk-components/Button'
import ContactReviewRow from './ContactReviewRow'

export default function ContactReviewTable ({ profile, contactPreferences }) {
  const navigate = useNavigate()

  const EmailAddressesSection = () => {
    return (
      <>
        {profile.emails.length > 0 || profile.unverified.emails.length > 0
          ? (
            <tbody className='govuk-table__body'>
              {profile.emails.map((email, index) => (
                <ContactReviewRow
                  contact={email}
                  contactType='email'
                  isConfirmed
                  key={index}
                />
              ))}
              {profile.unverified.emails.map((unregisteredEmail, index) => (
                <ContactReviewRow
                  contact={unregisteredEmail}
                  contactType='email'
                  isConfirmed={false}
                  key={index}
                />
              ))}
            </tbody>
            )
          : null}
      </>
    )
  }

  const MobileNumbersSection = () => {
    return (
      <>
        {profile.mobilePhones.length > 0 ||
        profile.unverified.mobilePhones.length > 0
          ? (
            <tbody className='govuk-table__body'>
              {profile.mobilePhones.map((mobilePhone, index) => (
                <ContactReviewRow
                  contact={mobilePhone}
                  contactType='mobilePhone'
                  isConfirmed
                  key={index}
                />
              ))}
              {profile.unverified.mobilePhones.map(
                (unregisteredMobilePhone, index) => (
                  <ContactReviewRow
                    contact={unregisteredMobilePhone}
                    contactType='mobilePhone'
                    isConfirmed={false}
                    key={index}
                  />
                )
              )}
            </tbody>
            )
          : null}
      </>
    )
  }

  const HomePhonesSection = () => {
    return (
      <>
        {profile.homePhones.length > 0 ||
        profile.unverified.homePhones.length > 0
          ? (
            <tbody className='govuk-table__body'>
              {profile.homePhones.map((homePhone, index) => (
                <ContactReviewRow
                  contact={homePhone}
                  contactType='homePhone'
                  isConfirmed
                  key={index}
                />
              ))}
              {profile.unverified.homePhones.map(
                (unregisteredHomePhone, index) => (
                  <ContactReviewRow
                    contact={unregisteredHomePhone}
                    contactType='homePhone'
                    isConfirmed={false}
                    key={index}
                  />
                )
              )}
            </tbody>
            )
          : null}
      </>
    )
  }

  const handleButton = () => {
    navigate('/signup/review/addcontact')
  }

  return (
    <>
      <h3 className='govuk-heading-m'>How you'll get flood messages</h3>

      <table className='govuk-table'>
        <tbody className='govuk-table__body'>
          <EmailAddressesSection />
          {contactPreferences.includes('Text')
            ? (
              <MobileNumbersSection />
              )
            : null}
          {contactPreferences.includes('PhoneCall')
            ? (
              <HomePhonesSection />
              )
            : null}
        </tbody>
      </table>
      <Button
        className='govuk-button--secondary'
        onClick={handleButton}
        text='Add another email or phone number'
      />
      <br />
      <br />
    </>
  )
}
