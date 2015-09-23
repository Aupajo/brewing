//= require moment

(function() {
  var progressElements = document.querySelectorAll('.progress')

  Array.prototype.forEach.call(progressElements, function(element) {
    var startMoment = moment(element.getAttribute('data-start'))
    var endMoment = moment(element.getAttribute('data-end'))
    var now = moment()
    var progress = Math.min(1, Math.max(1 - endMoment.diff(now) / endMoment.diff(startMoment), 0))

    element.querySelector('.fill').style.width = (progress * 100) + '%'
  })
})()
