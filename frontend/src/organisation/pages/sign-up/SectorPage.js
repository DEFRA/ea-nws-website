import { useNavigate } from 'react-router'
import SectorLayout from '../../layouts/sector/SectorLayout'

export default function SectorPage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/sign-up/main-admin')

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/number')
  }

  return (
    <SectorLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
