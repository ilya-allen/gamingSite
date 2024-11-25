'use strict';

const percentageText = document.querySelector('.percentage_text');
const rangeSlider = document.querySelector('.range_slider');

rangeSlider.addEventListener('mouseup', function() {
    let val = rangeSlider.value;
    percentageText.textContent = `Percentage: ${val}%`  
})

