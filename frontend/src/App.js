import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignBackIn from './pages/signOut/SignBackIn'
import { routes } from './routes/routes'
import userIsSigndout from './services/CheckUserSignInService'

export default function App() {
  /* the two var bellow checks if the user is logged out. 
   the bottom one checks if there is a user present
   the top simulates a user being present
   cant access some pages without user being present
   takes too long to log into account just to test pages
   each test file says what comment to comment/uncomment for each test*/

  //let userLoggedout = false //use for testing
  let userLoggedout = userIsSigndout() // use  this for actual program

  console.log(userLoggedout)
  //this if statement may increase as non authentication needed pages are developed
  // if (
  //   userLoggedout === true &&
  //   window.location.href !== 'http://localhost:3000/Start' &&
  //   window.location.href !== 'http://localhost:3000/SignInPage'
  // ) {
  //   console.log(window.location.href)
  //   return <SignBackIn />
  // } else {

  return userLoggedout ? (
    <BrowserRouter basename="/">
      <SignBackIn />
    </BrowserRouter>
  ) : (
    <BrowserRouter basename="/">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  )

  // return (
  //   <BrowserRouter basename='/'>
  //     <Routes>
  //     {unAuthRoutes.map((route,index) = (
  //       Route key={index} path={unAuthRoutes.path} element={unAuthRoutes.component} />
  //     ))}
  //     </Routes>
  //   </BrowserRouter>
  // ):

  // return (
  //   <BrowserRouter basename="/">
  //     <Routes>
  //       {routes.map((route, index) => (
  //         <Route key={index} path={route.path} element={route.component} />
  //       ))}
  //     </Routes>
  //   </BrowserRouter>
  // )
}

//}
