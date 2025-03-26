export default function ContactDetails() {
  return (
    <>
      <ul class='govuk-list'>
        <li>
          Telephone: <TelephoneNumber />
        </li>
        <li>
          Textphone: <TextphoneNumber />
        </li>
        <li>24 hour service</li>
        <li>
          <a class='govuk-link' href='https://www.gov.uk/call-charges'>
            Find out about call charges
          </a>
        </li>
      </ul>
    </>
  )
}

export function TelephoneNumber() {
  return '0345 988 118'
}

export function TextphoneNumber() {
  return '0345 602 6340'
}
