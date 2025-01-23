import React from 'react'
import ReactDOM from 'react-dom/client'
import TagManager from 'react-gtm-module'
import { Provider } from 'react-redux'
import App from './App'
import './common/css/custom.css'
import store from './common/redux/store'
import { backendCall } from './common/services/BackendService'

const root = ReactDOM.createRoot(document.getElementById('root'))

const getGtmId = async () => {
  const { data } = await backendCall(
    'data',
    'api/values/gtm'
  )
  if (data) {
    return data
  } else {
    return null
  }
}

const tagManagerArgs = {
  gtmId: await getGtmId()
}

if (tagManagerArgs.gtmId !== null) {
  TagManager.initialize(tagManagerArgs)
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
