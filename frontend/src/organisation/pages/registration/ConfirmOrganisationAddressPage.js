import { useNavigate } from 'react-router'
import ConfirmOrganisationAddressLayout from '../../layouts/organisation-address/ConfirmOrganisationAddressLayout'

export default function ConfirmOrganisationAddressPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/register/address')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/address')
  }

  return (
    <ConfirmOrganisationAddressLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
