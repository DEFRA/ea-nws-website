import { useNavigate } from 'react-router'
import ConfirmAddressLayout from '../../layouts/address/ConfirmAddressLayout'

export default function ConfirmAddressPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate('/organisation/sign-up/number')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/address-search')
  }

  return (
    <ConfirmAddressLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
