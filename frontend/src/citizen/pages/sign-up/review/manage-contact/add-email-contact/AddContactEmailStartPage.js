import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
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
        <title>Enter an Email Address - Get flood warnings - GOV.UK</title>
      </Helmet>
      <AddEmailLayout navigateToNextPage={navigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage} />
    </>
  )
}
