// https://tinyurl.com/yf795sm5 - link to medium post on how this fix was found

export function removeHoverIosSafari() {
  if (!isIosSafari()) return

  // Tags of interest: Only process certain interactive elements
  function shouldPrevent(target) {
    var tagName = target.tagName.toLowerCase()
    var datasetBind = target.dataset.bind
    var preventFilter =
      (datasetBind && datasetBind.indexOf('click') > -1) ||
      tagName === 'a' ||
      tagName === 'button' ||
      (tagName === 'input' &&
        (target.type === 'radio' || target.type === 'checkbox'))
    return preventFilter
  }
  var eventSelector = {
    touchend: function (_, target) {
      // Reset any flags on touchend
      target.dataset._clicked_ = ''
      target.dataset._mousemove_ = '0'
      target.dataset._timeOutId_ = ''
    },
    mouseover: function (e) {
      e.preventDefault() // Prevent default hover behavior
    },
    mousemove: function (e, target) {
      e.preventDefault() // Prevent default hover behavior
      var _mousemoves = +(target.dataset._mousemove_ || '0')
      _mousemoves = _mousemoves + 1
      target.dataset._mousemove_ = _mousemoves
      // Trigger click event after enough movement
      if (_mousemoves > 1 && !target.dataset._timeOutId_) {
        var id = setTimeout(function () {
          target.click() // Simulate a click after mouse move
        }, 80) // Adjust delay to fine-tune the click event timing
        target.dataset._timeOutId_ = id
      }
    },
    click: function (e, target) {
      // Prevent double click
      if (target.dataset._clicked_) {
        // This check prevents interference with valid tracking
        // and programmatic click events.
        if (e.isTrusted) {
          e.preventDefault()
        }
        return
      }
      // Prevent timeout click
      if (target.dataset._timeOutId_) {
        clearTimeout(+target.dataset._timeOutId_)
      }
      // Mark element as clicked
      target.dataset._clicked_ = 'true'
    }
  }
  function preventHover(e) {
    var target = e.target
    // Skip elements that don't have click handlers or necessary attributes
    if (!(target && target.click && target.tagName && target.dataset)) return
    if (!shouldPrevent(target)) return
    var type = e.type
    eventSelector[type] && eventSelector[type](e, target)
  }
  // Add event listeners for touch and mouse events
  document.addEventListener('touchend', preventHover, true)
  document.addEventListener('mouseover', preventHover, true)
  document.addEventListener('mousemove', preventHover, true)
  document.addEventListener('click', preventHover, true)
}

function isIosSafari() {
  return (
    /iP(ad|hone|od)/.test(navigator.userAgent) &&
    /WebKit/.test(navigator.userAgent) &&
    !/CriOS|FxiOS/.test(navigator.userAgent)
  )
}
