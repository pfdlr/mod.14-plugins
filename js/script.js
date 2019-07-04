'use strict';
/* Flickity plugin */
var elem = document.querySelector(".main-carousel");
var flkty = new Flickity(elem, {
  // options
  hash: true,
  contain: true,
  wrapAround: true,
  //autoPlay: 1500,
  pageDots: false
});

document.querySelector(".restart-button").addEventListener("click", function() {
  flkty.selectCell("#carousel-cell1");
});

var progressBar = document.querySelector(".progress-bar");
flkty.on("scroll", function(progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBar.style.width = progress * 100 + "%";
});
