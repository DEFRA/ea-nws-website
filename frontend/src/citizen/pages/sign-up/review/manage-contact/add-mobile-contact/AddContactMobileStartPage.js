import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import AddMobileLayout from '../../../../../layouts/mobile/AddMobileLayout'

export default function AddMobileContactStartPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => {
    navigate('/signup/review/validate-mobile')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/review')
  }

  return (
    <>
      <Helmet>
        <title>Enter a telephone number - Get flood warnings - GOV.UK</title>
      </Helmet>
      <AddMobileLayout navigateToNextPage={navigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage} />
    </>
  )
}
