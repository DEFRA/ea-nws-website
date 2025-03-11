import { useLocation, useNavigate } from 'react-router'
import ConfirmAddressLayout from '../../layouts/address/ConfirmAddressLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function ConfirmAddressPage () {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateToNextPage = () => {
    if (location.state?.returnToReview) {
      navigate(orgSignUpUrls.review)
    } else {
      navigate(orgSignUpUrls.compHouseNum)
    }
  }

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.address.select)
  }

  return (
    <ConfirmAddressLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
