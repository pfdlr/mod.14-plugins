'use strict';

(function () {
 /* ___________________ Mustache ______________________________*/

  var result = document.getElementById('result');
  var templatePhotos = document.getElementById('template-photos').innerHTML;
  Mustache.parse(templatePhotos);
  var listPhotos = '';

  for (var i = 0; i < photos.length; i++) {
    console.log(photos);
    listPhotos += Mustache.render(templatePhotos, photos[i]);
  }
  var entireList = Mustache.render(listPhotos);
  result.insertAdjacentHTML('beforeend', entireList);

  /* ___________________ Flickity plugin _______________________*/

  var elem = document.querySelector(".main-carousel");
  var flkty = new Flickity(elem, {
    // options
    hash: true,
    contain: true,
    wrapAround: true,
    pageDots: false
  });

  document.querySelector(".restart-button").addEventListener("click", function () {
    flkty.selectCell("#carousel-cell1");
  });

  var progressBar = document.querySelector(".progress-bar");
  flkty.on("scroll", function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + "%";
  });

   /* ___________________ Google Maps ___________________________*/
// Initialize and add the map
window.initMap = function() {
  
  // center map
  var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: photos[0].coords});

  // markers from photos.coords
  for(var i= 0; i < photos.length; i++) {
    var marker = new google.maps.Marker({position: photos[i].coords, map: map});    
  }
}
})(); 