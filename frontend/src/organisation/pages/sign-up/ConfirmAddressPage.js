import { useNavigate } from 'react-router'
import ConfirmAddressLayout from '../../layouts/address/ConfirmAddressLayout'

export default function ConfirmAddressPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/sign-up/number')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/address')
  }

  return (
    <ConfirmAddressLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
