import React, { useEffect, useRef, useState } from 'react'
import { useCookies, withCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import InactivityPopup from './common/components/custom/InactivityPopup'
import ScrollToTop from './common/components/custom/ScrollToTop'
import { clearAuth, setLastActivity } from './common/redux/userSlice'
import { authenticatedRoutes, routes } from './routes'

function App () {
  const auth = useSelector((state) => state.session.authToken)
  const signinType = useSelector((state) => state.session.signinType)
  const [isInactive, setIsInactive] = useState(false)
  const [isPopUpOnScreen, setIsPopUpOnScreen] = useState(false)
  const inactivityTimer = useRef(null)
  const redirectTimer = useRef(null)
  const currentRoute = window.location.pathname
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])
  const hasAuthCookie = cookies.authToken
  const dispatch = useDispatch()
  const lastActivity = useSelector((state) => state.session.lastActivity)

  /* Clear local storage if no cookies,
  cookies are only for the browser session. */
  useEffect(() => {
    if (auth && !hasAuthCookie) {
      dispatch(clearAuth())
    }
  }, [hasAuthCookie])

  /* Remove the cookie and clear local storage
  after inactivity period. This protects when closing
  all website tabs (but not the browser) so there is
  still a session cookie */
  useEffect(() => {
    const currentTime = Date.now()
    const timeout = (Number(process.env.REACT_APP_INACTIVITY_POPUP) + Number(process.env.REACT_APP_TIMEOUT_POPUP)) * 1000
    if ((currentTime - lastActivity) > timeout) {
      removeCookie('authToken', { path: '/' })
      dispatch(clearAuth())
    }
  }, [lastActivity])

  useEffect(() => {
    if (isPopUpOnScreen === false) {
      const resetInactivityTimer = () => {
        if (hasAuthCookie) {
          clearTimeout(inactivityTimer.current)
          clearTimeout(redirectTimer.current)
          setIsInactive(false)
          /* Keep track of the last active time to be
          used to determine whether to clear storage and
          cookies. */
          dispatch(setLastActivity(Date.now()))
          inactivityTimer.current = setTimeout(() => {
            setIsInactive(true)
            setIsPopUpOnScreen(true)
          }, process.env.REACT_APP_INACTIVITY_POPUP * 1000)
        }
      }

      const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']

      if (hasAuthCookie) {
        events.forEach((event) =>
          window.addEventListener(event, resetInactivityTimer)
        )
      }

      return () => {
        events.forEach((event) =>
          window.removeEventListener(event, resetInactivityTimer)
        )
        clearTimeout(inactivityTimer.current)
        clearTimeout(redirectTimer.current)
      }
    }
  }, [hasAuthCookie, isPopUpOnScreen])

  useEffect(() => {
    if (isPopUpOnScreen === true) {
      redirectTimer.current = setTimeout(() => {
        window.location.pathname =
          signinType === 'org' ? '/organisation/signout-auto' : '/signout-auto'
      }, process.env.REACT_APP_TIMEOUT_POPUP * 1000)
    }
  }, [isPopUpOnScreen])

  const handleStayLoggedIn = () => {
    setIsInactive(false)
    setIsPopUpOnScreen(false)
    clearTimeout(redirectTimer.current)
  }

  const isSignOutRoute = () => {
    return currentRoute.includes('/signout') ||
      currentRoute === '/account/delete/confirm'
  }

  const SignBackInLink = () => {
    if (currentRoute.includes('organisation')) {
      return '/organisation/sign-back-in'
    } else {
      return '/sign-back-in'
    }
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          {authenticatedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                hasAuthCookie || isSignOutRoute()
                  ? (
                      route.component
                    )
                  : (
                    <Navigate to={SignBackInLink()} />
                    )
              }
            />
          ))}
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                 (route.path === '/signin' || route.path === '/signup/register-location/search') && hasAuthCookie
                   ? <Navigate to='/home' replace />
                   : route.component
              }
            />
          ))}

        </Route>
      </Routes>
      {isInactive && <InactivityPopup onStayLoggedIn={handleStayLoggedIn} />}
    </BrowserRouter>
  )
}

export default withCookies(App)
