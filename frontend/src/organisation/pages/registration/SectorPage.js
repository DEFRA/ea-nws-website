import { useNavigate } from 'react-router'
import SectorLayout from '../../layouts/sector/SectorLayout'

export default function SectorPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/register/main-admin')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/number')
  }

  return (
    <SectorLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
