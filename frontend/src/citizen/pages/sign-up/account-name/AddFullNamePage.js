import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setProfile } from '../../../../common/redux/userSlice'
import { updateAdditionals } from '../../../../common/services/ProfileServices'
import AddAccountNameLayout from '../../../layouts/account-name/AddAccountNameLayout'

export default function AddFullNamePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)

  const NavigateToNextPage = () => {
    const updatedProfile = updateAdditionals(session.profile, [{ id: 'lastAccessedUrl', value: '/declaration' }])
    dispatch(setProfile(updatedProfile))
    navigate('/declaration')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/contactpreferences')
  }

  return (
    <AddAccountNameLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      buttonText='Continue'
    />
  )
}
