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

  var endpoint = 'https://aupajo-brewbot.herokuapp.com/temperatures'

  var fetch = function() {
    $.getJSON(endpoint, function(data) {
      renderChart(data.reverse())
    })
  }

  var chart = document.getElementById("rendering")

  var renderChart = function(input) {
    var data = input.map(function(entry) {
      var parts = entry.split("|")
      var epochSeconds = moment(parts[0]).unix()
      var temperature = parseFloat(parts[1])
      return { x: epochSeconds, y: temperature }
    })

    var graph = new Rickshaw.Graph( {
      element: chart,
      height: 250,
      series: [{
        name: "Temp",
        color: 'rgb(223, 152, 31)',
        data: data
      }]
    })

    new Rickshaw.Graph.Axis.Time({ graph: graph })

    new Rickshaw.Graph.HoverDetail({
    	graph: graph,
      yFormatter: function(n) { return (Math.round(n * 10) / 10).toString() + 'º' }
    });

    new Rickshaw.Graph.Axis.Y( {
      graph: graph,
      orientation: 'left',
      pixelsPerTick: 50,
      tickFormat: function(n) { return n.toString() + 'º' },
      element: document.getElementById('time-axis'),
    });

    graph.render()
  }

  fetch()
})()
