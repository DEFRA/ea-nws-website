import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import store from '../../../common/redux/store'
import { setCurrentContact } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { webToGeoSafeContact } from '../../../common/services/formatters/ContactFormatter'
import { orgManageContactsUrls } from '../../routes/manage-contacts/ManageContactsRoutes'

export default function UpdateContactAndNavigate(setError, message) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sessionKey = useSelector((state) => state.session.sessionKey)

  const navigateToNextPage = async () => {
    const contact = webToGeoSafeContact(
      store.getState().session.orgCurrentContact
    )

    const dataToSend = { sessionKey, contact }
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
