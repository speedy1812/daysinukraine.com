console.info("Looks like the Middleman + Gulp asset pipeline is working!");

window.onload=function(){
  var menu = document.querySelector('.menu');
  var x = document.querySelector('.x');
  var sidebar = document.querySelector('.sidebar');

  menu.addEventListener('click', function() {
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.add('shadow-xl');
  });

  x.addEventListener('click', function() {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.remove('shadow-xl');
  });
}
