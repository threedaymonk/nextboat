var POLL_INTERVAL = 5 * 60 * 1000; // ms
var RENDER_INTERVAL = 2000; // ms

var STOP_POINT = '930GGLP';
var WALK_TIME = 10; // minutes

var departures = [];
var lastUpdatedAt;

function Departure(rawData) {
  this.destination = rawData['destinationName'];
  this.expectedArrival = Date.fromISO(rawData['expectedArrival']);
  this.direction = new Date(rawData['direction']);
}

Departure.prototype.minutesLeft = function() {
  return Math.floor((this.expectedArrival - new Date()) / 60000);
};

Departure.prototype.reachable = function() {
  return this.minutesLeft() >= WALK_TIME;
};

var poll = function() {
  setTimeout(poll, POLL_INTERVAL);
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4) {
      var json = JSON.parse(req.responseText);
      lastUpdatedAt = new Date();
      process(json);
    }
  };
  req.open('GET', '/stop/' + STOP_POINT + '/arrivals');
  req.send();
};

var process = function(entries) {
  departures = entries.map(function(e) {
    return new Departure(e);
  });
};

var render = function() {
  setTimeout(render, RENDER_INTERVAL);
  var html = '';
  departures.
    filter(function(d) { return d.minutesLeft() >= 0 }).
    sort(function(a, b) { return a.minutesLeft() - b.minutesLeft() }).
    forEach(function(d) {
      html += '<div class="departure ' + (d.reachable() ? 'reachable' : 'unreachable') + '">';
      html += '<div class="destination">' + d.destination + '</div>';
      html += '<div class="timeLeft">' + d.minutesLeft() + '</div>';
      html += '</div>';
    });
  if (document.getElementById('departures').innerHTML != html) {
    document.getElementById('departures').innerHTML = html;
  }
  if (lastUpdatedAt) {
    var updatedAgo = Math.floor((new Date() - lastUpdatedAt) / 60000);
    document.getElementById('lastUpdate').innerText = 'Updated ' + updatedAgo + 'm ago';
  }
}

window.onload = function() {
  render();
  poll();
}
