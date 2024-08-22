import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import InactivityPopup from './common/components/custom/InactivityPopup'
import ScrollToTop from './common/components/custom/ScrollToTop'
import { authenticatedRoutes, routes } from './routes'

export default function App() {
  const auth = useSelector((state) => state.session.authToken)
  const signinType = useSelector((state) => state.session.signinType)
  const [isInactive, setIsInactive] = useState(false)
  const [isPopUpOnScreen, setIsPopUpOnScreen] = useState(false)
  const inactivityTimer = useRef(null)
  const redirectTimer = useRef(null)
  const currentRoute = window.location.pathname

  useEffect(() => {
    if (isPopUpOnScreen === false) {
      const resetInactivityTimer = () => {
        if (auth) {
          clearTimeout(inactivityTimer.current)
          clearTimeout(redirectTimer.current)
          setIsInactive(false)
          inactivityTimer.current = setTimeout(() => {
            setIsInactive(true)
            setIsPopUpOnScreen(true)
          }, process.env.REACT_APP_INACTIVITY_POPUP * 1000)
        }
      }

      const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']

      if (auth) {
        events.forEach((event) =>
          window.addEventListener(event, resetInactivityTimer)
        )
        resetInactivityTimer()
      }

      return () => {
        events.forEach((event) =>
          window.removeEventListener(event, resetInactivityTimer)
        )
        clearTimeout(inactivityTimer.current)
        clearTimeout(redirectTimer.current)
      }
    }
  }, [auth, isPopUpOnScreen])

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
    if (
      currentRoute.includes('/signout') ||
      currentRoute === '/account/delete/confirm'
    ) {
      return true
    } else {
      return false
    }
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
          {authenticatedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                auth || isSignOutRoute() ? (
                  route.component
                ) : (
                  <Navigate to={SignBackInLink()} />
                )
              }
            />
          ))}
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>
      </Routes>
      {isInactive && <InactivityPopup onStayLoggedIn={handleStayLoggedIn} />}
    </BrowserRouter>
  )
}
