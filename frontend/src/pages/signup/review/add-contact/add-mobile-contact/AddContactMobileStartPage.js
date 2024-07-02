import { useNavigate } from 'react-router'
import AddMobileLayout from '../../../../../common-layouts/mobile/AddMobileLayout'

export default function AddMobileContactStartPage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => {
    navigate('/signup/review/validate-mobile')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/review')
  }

  return (
    <AddMobileLayout NavigateToNextPage={NavigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage}/>
  )
}