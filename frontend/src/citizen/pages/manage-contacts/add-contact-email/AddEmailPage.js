import { useNavigate } from 'react-router-dom'
import AddEmailLayout from '../../../layouts/email/AddEmailLayout'

export default function AddEmailPage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => {
    navigate('/managecontacts/validate-email')
  }

  return <AddEmailLayout NavigateToNextPage={NavigateToNextPage} />
}
