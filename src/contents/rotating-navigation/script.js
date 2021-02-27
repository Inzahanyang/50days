const open = document.getElementById('open'),
    close = document.getElementById('close'),
    container = document.querySelector('.rotating-container');

console.log(open);

open.addEventListener('click', () => container.classList.add('show-nav'));
close.addEventListener('click', () => container.classList.remove('show-nav'));
