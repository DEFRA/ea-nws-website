import { useNavigate } from 'react-router-dom'
import ValidateMobileLayout from '../../../layouts/mobile/ValidateMobileLayout'

export default function ValidateMobilePhonePage () {
  const navigate = useNavigate()

  const navigateToNextPage = (mobilePhone) => {
    navigate('/managecontacts', {
      state: {
        confirmedtype: 'mobilePhone',
        confirmedvalue: mobilePhone
      }
    })
  }
  const SkipValidation = (mobilePhone) => {
    navigate('/managecontacts', {
      state: {
        unconfirmedtype: 'mobilePhone',
        unconfirmedvalue: mobilePhone
      }
    })
  }
  const DifferentMobile = () => {
    navigate('/managecontacts/add-mobile')
  }

  return (
    <ValidateMobileLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={DifferentMobile}
      SkipValidation={SkipValidation}
      DifferentMobile={DifferentMobile}
    />
  )
}
