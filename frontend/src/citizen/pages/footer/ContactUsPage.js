import * as React from 'react'
import ContactUsLayout from '../../../common/layouts/footer-link-layouts/ContactUsLayout'

export default function ContactUsPage () {
  const email = 'enquiries@environment-agency.gov.uk'
  return (

    <>
      <ContactUsLayout
        email={email}
      />
    </>
  )
}
