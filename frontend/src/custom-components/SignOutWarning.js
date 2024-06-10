import { useEffect, useState } from 'react'
const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress']

const AppLogout = () => {
  const [showModal, setShowModal] = useState(false)
  let timer

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer()
        handleTimer()
      })
    })
  }, [])

  const resetTimer = () => {
    setShowModal(false)
    if (timer) clearTimeout(timer)
  }

  const handleTimer = () => {
    timer = setTimeout(() => {
      // resetTimer()
      // Object.values(events).forEach((item) => {
      //   window.removeEventListener(item, resetTimer)
      // })
      // logoutAction()
      setShowModal(true)
    }, 5000)
  }

  const logoutAction = () => {
    sessionStorage.clear()
    window.location.pathname = '/'
  }
  //   return (
  // //{showModal ? <></> : <modal userCLicked={resetTimer}/>}
  //   )
}

export default AppLogout
