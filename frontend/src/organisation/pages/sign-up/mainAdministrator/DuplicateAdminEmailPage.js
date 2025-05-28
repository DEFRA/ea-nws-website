import { Helmet } from 'react-helmet'
import SignUpDuplicateEmailPageLayout from '../../../../common/layouts/sign-up/SignUpDuplicateEmailPageLayout'

export default function DuplicateAdminEmailPage () {
  return (
    <>
      <Helmet>
        <title>Email address already in use - GOV.UK</title>
      </Helmet>
      <SignUpDuplicateEmailPageLayout />
    </>
  )
}
