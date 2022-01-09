'use strict'
//alert('Skrypt podpiety!')

let mobMenuBtn = document.querySelectorAll('.mobile-hamburger')[0];
let dropMenuHolder = document.querySelector('.open-menu-holder');
let closeMenuCross = document.querySelector('.mobile-close'); 

mobMenuBtn.addEventListener('click', () => dropMenuHolder.classList.toggle('open'));
closeMenuCross.addEventListener('click', () => dropMenuHolder.classList.toggle('open'));