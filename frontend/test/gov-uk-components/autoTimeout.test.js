//To DO

import '@testing-library/jest-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthToken } from '../../src/redux/userSlice'

describe('auto timeout', () => {
  const dispatch = useDispatch
  test.skip('user is logged in to service', () => {
    const session = useSelector((state) => state.session)
    dispatch(setAuthToken('123'))
    expect(session.authToken).toHaveTextContent('123')
  })

  //   test('warning shown', () => {})

  //   test('user logged out', () => {})
})
