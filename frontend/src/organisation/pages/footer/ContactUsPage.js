import ContactUsLayout from '../../../common/layouts/footer-link-layouts/ContactUsLayout'

export default function ContactUsPage () {
  const email = 'getfloodwarnings@environment-agency.gov.uk'
  return (
    <>
      <ContactUsLayout
        email={email}
      />
    </>
  )
}
