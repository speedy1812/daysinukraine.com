console.info("Looks like the Middleman + Gulp asset pipeline is working!");

window.onload=function(){
  const menu = document.querySelector('.menu');
  const x = document.querySelector('.x');
  const sidebar = document.querySelector('.sidebar');

  menu.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.add('shadow-xl');
  });

  x.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.remove('shadow-xl');
  });
}
