import PrivateBetaMockFloodAlertPage from '../../pages/private-beta/PrivateBetaMockFloodAlertPage'
import PrivateBetaMockFloodWarningPage from '../../pages/private-beta/PrivateBetaMockFloodWarningPage'
import PrivateBetaMockFloodSevereWarningPage from '../../pages/private-beta/PrivateBetaMockFloodSevereWarningPage'
import PrivateBetaMockFloodWarningRemovedPage from '../../pages/private-beta/PrivateBetaMockFloodWarningRemovedPage'
import PrivateBetaMockFloodAlertRemovedPage from '../../pages/private-beta/PrivateBetaMockFloodAlertRemovedPage'
import PrivateBetaMockFloodWarningRemovedAlertPage from '../../pages/private-beta/PrivateBetaMockFloodWarningRemovedAlertPage'

// sign out routes
const privateBetaRoutes = [
  { path: '/private-beta/flood-alert', component: <PrivateBetaMockFloodAlertPage /> },
  { path: '/private-beta/flood-warning', component: <PrivateBetaMockFloodWarningPage /> },
  { path: '/private-beta/flood-severe-warning', component: <PrivateBetaMockFloodSevereWarningPage /> },
  { path: '/private-beta/flood-warning-removed', component: <PrivateBetaMockFloodWarningRemovedPage /> },
  { path: '/private-beta/flood-alert-removed', component: <PrivateBetaMockFloodAlertRemovedPage /> },
  { path: '/private-beta/flood-warning-removed-alert', component: <PrivateBetaMockFloodWarningRemovedAlertPage /> }
]

export default privateBetaRoutes
