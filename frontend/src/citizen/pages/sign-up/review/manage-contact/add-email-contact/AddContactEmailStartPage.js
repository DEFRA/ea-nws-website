import { useNavigate } from 'react-router'
import AddEmailLayout from '../../../../../layouts/email/AddEmailLayout'

export default function AddEmailContactStartPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => {
    navigate('/signup/review/validate-email')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/review')
  }

  return (
    <AddEmailLayout navigateToNextPage={navigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage} />
  )
}
