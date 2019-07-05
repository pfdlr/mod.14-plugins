"use strict";
(function() {
  /* ___________________ Mustache ______________________________*/

  var result = document.getElementById("result");
  var templatePhotos = document.getElementById("template-photos").innerHTML;
  Mustache.parse(templatePhotos);
  var listPhotos = "";

  for (let i = 0; i < photos.length; i++) {
    console.log(photos);
    listPhotos += Mustache.render(templatePhotos, photos[i]);
  }
  var entireList = Mustache.render(listPhotos);
  result.insertAdjacentHTML("beforeend", entireList);
})();

/* ___________________ Flickity plugin _______________________*/

var elem = document.querySelector(".main-carousel");
var flkty = new Flickity(elem, {
  // options
  hash: true,
  contain: true,
  wrapAround: true,
  pageDots: false
});

document.querySelector(".restart-button").addEventListener("click", function() {
  flkty.selectCell(document.getElementsByClassName("carousel-cell")[0]);
});

var progressBar = document.querySelector(".progress-bar");
flkty.on("scroll", function(progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBar.style.width = progress * 100 + "%";
});

/* ___________________ Google Maps ___________________________*/
// Initialize and add the map
window.initMap = function() {
  // center map
  var map = new google.maps.Map(document.getElementById("map"), { zoom: 3, center: photos[0].coords });

  // add markers on map from photos.coords
  for (let i = 0; i < photos.length; i++) {
    var marker = new google.maps.Marker({
      position: photos[i].coords,
      map: map
    });
    //change slide on click on a marker
    marker.addListener("click", function() {
      flkty.selectCell(document.getElementsByClassName("carousel-cell")[i]);
    });
  }
  //center the map after changing the slide
  flkty.on("change", function(index) {
    /* basic
    map.panTo(photos[index].coords);
    map.setZoom(10);
    */
    //KODILLA code
    smoothPanAndZoom(map, 8, photos[index].coords);
  });
  /* _____________________Funkcja KODILLI_________________________________ */
  var smoothPanAndZoom = function(map, zoom, coords) {
    var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
    jumpZoom = Math.min(jumpZoom, zoom - 1);
    jumpZoom = Math.max(jumpZoom, 3);
    smoothZoom(map, jumpZoom, function() {
      smoothPan(map, coords, function() {
        smoothZoom(map, zoom);
      });
    });
  };

  var smoothZoom = function(map, zoom, callback) {
    var startingZoom = map.getZoom();
    var steps = Math.abs(startingZoom - zoom);
    if (!steps) {
      if (callback) {
        callback();
      }
      return;
    }
    var stepChange = -(startingZoom - zoom) / steps;
    var i = 0;
    var timer = window.setInterval(function() {
      if (++i >= steps) {
        window.clearInterval(timer);
        if (callback) {
          callback();
        }
      }
      map.setZoom(Math.round(startingZoom + stepChange * i));
    }, 80);
  };

  var smoothPan = function(map, coords, callback) {
    var mapCenter = map.getCenter();
    coords = new google.maps.LatLng(coords);
    var steps = 12;
    var panStep = { lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps };
    var i = 0;
    var timer = window.setInterval(function() {
      if (++i >= steps) {
        window.clearInterval(timer);
        if (callback) callback();
      }
      map.panTo({ lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i });
    }, 1000 / 30);
  };
}; //end of init.map
