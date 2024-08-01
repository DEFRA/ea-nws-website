import { Link } from 'react-router-dom'

export default function BackLink ({ onClick, to }) {
  return (
    <Link
      onClick={onClick}
      to={to}
      className='govuk-back-link govuk-!-margin-bottom-0 govuk-!-margin-top-0'
    >
      Back
    </Link>
  )
}
