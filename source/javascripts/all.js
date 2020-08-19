console.info("Looks like the Middleman + Gulp asset pipeline is working!");

window.onload=function(){
  const menu = document.querySelector('.menu');
  const x = document.querySelector('.x');
  const sidebar = document.querySelector('.sidebar');

  menu.addEventListener('click', () => {
    if (sidebar.classList.contains('hidden')) {
      sidebar.classList.remove('hidden');
    }
  });

  x.addEventListener('click', () => {
    sidebar.classList.add('hidden');
  });
}
