const AlertType = {
  SEVERE_FLOOD_WARNING: 'ALERT_LVL_1',
  FLOOD_WARNING: 'ALERT_LVL_2',
  FLOOD_ALERT: 'ALERT_LVL_3',
  REMOVE_FLOOD_SEVERE_WARNING: 'MONTHLY',
  REMOVE_FLOOD_WARNING: 'RESERVED',
  INFO: 'INFO',
  // the below isn't a geosafe alert type
  WARNING_REMOVED: 'removed' // this is purely used to display warnings removed in last 24 hours
}

export default AlertType
