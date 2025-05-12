import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet'
import AddEmailLayout from '../../../../../layouts/email/AddEmailLayout'

export default function AddEmailContactStartPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => {
    navigate('/signup/review/validate-email')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/review')
  }

  return (
    <>
      <Helmet>
        <title>Enter an Email Address - Next Warning Service GOV.UK</title>
      </Helmet>
      <AddEmailLayout navigateToNextPage={navigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage} />
    </>
  )
}
