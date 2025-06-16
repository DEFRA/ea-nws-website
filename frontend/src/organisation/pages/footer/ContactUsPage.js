import { Helmet } from 'react-helmet'
import ContactUsLayout from '../../../common/layouts/footer-link-layouts/ContactUsLayout'

export default function ContactUsPage () {
  const email = 'getfloodwarnings@environment-agency.gov.uk'
  return (
    <>
      <Helmet>
        <title>Contact us - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <ContactUsLayout
        email={email}
      />
    </>
  )
}
