import { useNavigate } from 'react-router'
import SectorLayout from '../../layouts/sector/SectorLayout'

export default function SectorPage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => navigate('/organisation/register/sector') // Will link to Laurent's EAN-1038 pages

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
