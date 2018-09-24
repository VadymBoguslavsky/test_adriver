$(document).ready(function () {
 $('.main_slider').slick({
  nextArrow: '<i class="fa fa-arrow-right arrow_right"></i>',
  prevArrow: '<i class="fa fa-arrow-left arrow_left"></i>',
  asNavFor: '.slider2',
  infinite: true,
  draggable: true,
  responsive: [
   {
    breakpoint: 1000,
    settings: {
     dots: true
    }
   }
  ]
 });

 $('.slider2').slick({
  infinite: true,
  slidesToShow: 5,
  focusOnSelect: true,
  centerMode: true,
  asNavFor: '.main_slider',
  appendArrows: false
 });
});

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}