import { useNavigate } from 'react-router'
import AddMobileLayout from '../../../common-layouts/mobile/AddMobileLayout'

export default function AddMobilePage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => {
    navigate('/managecontacts/validate-mobile')
  }

  const NavigateToPreviousPage = () => {
    navigate('/managecontacts')
  }

  return (
    <AddMobileLayout NavigateToNextPage={NavigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage}/>
  )
}
