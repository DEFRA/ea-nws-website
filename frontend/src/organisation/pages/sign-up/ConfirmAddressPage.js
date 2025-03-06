import { useNavigate } from 'react-router'
import ConfirmAddressLayout from '../../layouts/address/ConfirmAddressLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function ConfirmAddressPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate(orgSignUpUrls.compHouseNum)

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
