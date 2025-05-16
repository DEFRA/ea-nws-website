import React from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../common/components/gov-uk/Button'
import ContactReviewRow from './ContactReviewRow'

export default function ContactReviewTable ({ profile, contactPreferences }) {
  const navigate = useNavigate()

  const EmailAddressesSection = () => {
    return (
      <>
        {(profile.emails.length > 0 || profile.unverified?.emails) && (
          <>
            {profile.emails.map((email, index) => (
              <ContactReviewRow
                contact={
                  email.length > 20 && isMobile
                    ? email.slice(0, 20) + '...'
                    : email
                }
                contactType='email'
                isConfirmed
                key={index}
                emailIndex={index}
              />
            ))}
            {profile.unverified?.emails?.map((unregisteredEmail, index) => (
              <ContactReviewRow
                contact={unregisteredEmail.address}
                contactType='email'
                isConfirmed={false}
                key={index}
              />
            ))}
          </>
        )}
      </>
    )
  }

  const MobileNumbersSection = () => {
    return (
      <>
        {(profile.mobilePhones.length > 0 ||
          profile.unverified?.mobilePhones) && (
            <>
              {profile.mobilePhones.map((mobilePhone, index) => (
                <ContactReviewRow
                  contact={mobilePhone}
                  contactType='mobilePhone'
                  isConfirmed
                  key={index}
                />
              ))}
              {profile.unverified?.mobilePhones?.map(
                (unregisteredMobilePhone, index) => (
                  <ContactReviewRow
                    contact={unregisteredMobilePhone.address}
                    contactType='mobilePhone'
                    isConfirmed={false}
                    key={index}
                  />
                )
              )}
            </>
        )}
      </>
    )
  }

  const HomePhonesSection = () => {
    return (
      <>
        {(profile.homePhones.length > 0 || profile.unverified?.homePhones) && (
          <>
            {profile.homePhones.map((homePhone, index) => (
              <ContactReviewRow
                contact={homePhone}
                contactType='homePhone'
                isConfirmed
                key={index}
              />
            ))}
            {profile.unverified?.homePhones?.map(
              (unregisteredHomePhone, index) => (
                <ContactReviewRow
                  contact={unregisteredHomePhone.address}
                  contactType='homePhone'
                  isConfirmed={false}
                  key={index}
                />
              )
            )}
          </>
        )}
      </>
    )
  }

  const handleButton = (event) => {
    event.preventDefault()
    navigate('/signup/review/addcontact')
  }

  return (
    <div className='govuk-!-padding-bottom-4'>
      <h2 className='govuk-heading-m'>How you'll get flood messages</h2>
      <table className='govuk-table govuk-!-margin-bottom-0'>
        <tbody className='govuk-table__body'>
          <EmailAddressesSection />
          {contactPreferences.includes('Text') && <MobileNumbersSection />}
          {contactPreferences.includes('PhoneCall') && <HomePhonesSection />}
          <br />
        </tbody>
      </table>
      <Button
        className='govuk-button govuk-button--secondary'
        onClick={handleButton}
        text='Add another email or phone number'
      />
    </div>
  )
}
