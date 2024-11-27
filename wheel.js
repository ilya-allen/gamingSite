'use strict';

const percentageText = document.querySelector('.percentage_text');
const rangeSlider = document.querySelector('.range_slider');

rangeSlider.addEventListener('input', function() {
    let val = rangeSlider.value;
    let valPercentage = (rangeSlider.value / rangeSlider.max) * 100;
    percentageText.textContent = `Percentage: ${val}%`  
    rangeSlider.style.background = `linear-gradient(to right, #9381FF ${valPercentage}%, #fff ${valPercentage}%)`
})
