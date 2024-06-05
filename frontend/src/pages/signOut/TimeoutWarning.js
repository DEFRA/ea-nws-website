import WarningOverlay from './../../custom-components/WarningOverlay'
const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress']
export default function TimeoutWarning() {
  console.log('TIMEOUT!')
  WarningOverlay()
}
