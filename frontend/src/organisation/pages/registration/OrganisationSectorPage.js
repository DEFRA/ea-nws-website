import { useNavigate } from 'react-router'
import OrganisationSectorLayout from '../../layouts/sector/OrganisationSectorLayout'

export default function OrganisationSectorPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('#') // Links to Laurent's EAN-1038 pages

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/number')
  }

  return (
    <OrganisationSectorLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
