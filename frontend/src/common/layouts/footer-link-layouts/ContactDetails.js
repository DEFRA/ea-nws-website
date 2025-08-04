export default function ContactDetails () {
  return (
    <>
      <ul className='govuk-list'>
        <li>
          Telephone: <TelephoneNumber />
        </li>
        <li>
          Textphone: <TextphoneNumber />
        </li>
        <li>24 hour service</li>
        <li>
          <a className='govuk-link' href='https://www.gov.uk/call-charges'>
            Find out about call charges
          </a>
        </li>
      </ul>
    </>
  )
}

export function TelephoneNumber () {
  return '0345 988 1188'
}

export function TextphoneNumber () {
  return '0345 602 6340'
}
