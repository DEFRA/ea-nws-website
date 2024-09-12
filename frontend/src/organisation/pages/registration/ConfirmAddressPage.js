import { useNavigate } from 'react-router'
import ConfirmAddressLayout from '../../layouts/address/ConfirmAddressLayout'

export default function ConfirmAddressPage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/register/number')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/address')
  }

  return (
    <ConfirmAddressLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
