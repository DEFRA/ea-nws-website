import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import store from '../../../common/redux/store'
import { setCurrentContact } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { orgManageContactsUrls } from '../../routes/manage-contacts/ManageContactsRoutes'

export default function UpdateContactAndNavigate (setError, message) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const navigateToNextPage = async () => {
    const contact = store.getState().session.orgCurrentContact
    const dataToSend = { authToken, orgId, contact }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/organization/update_contact',
      navigate
    )

    if (data) {
      dispatch(setCurrentContact(data))
      message
        ? navigate(orgManageContactsUrls.view.viewContact, {
          state: { successMessage: [message] }
        })
        : navigate(orgManageContactsUrls.view.viewContact)
    } else {
      console.log('error: ', errorMessage)
      errorMessage
        ? setError(errorMessage)
        : setError('Oops, something went wrong')
    }
  }

  return navigateToNextPage
}
