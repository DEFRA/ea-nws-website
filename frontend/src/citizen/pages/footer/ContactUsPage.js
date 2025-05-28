import React from 'react'
import { Helmet } from 'react-helmet'
import ContactUsLayout from '../../../common/layouts/footer-link-layouts/ContactUsLayout'

export default function ContactUsPage () {
  const email = 'enquiries@environment-agency.gov.uk'
  
  return (
    <>
      <Helmet>
        <title>Contact Us - GOV.UK</title>
      </Helmet>
      <ContactUsLayout
        email={email}
      />
    </>
  )
}
