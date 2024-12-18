'use strict';

const percentageText = document.querySelector('.percentage_text');
const rangeSlider = document.querySelector('.range_slider');
rangeSlider.style.background = `linear-gradient(to right, #9381FF ${50}%, #fff ${50}%)`
const submitBet = document.querySelector('.submit_bet');
const betNum = document.querySelector('.bet_num');
const moneyText = document.querySelector('.money')
let money = 5;


rangeSlider.addEventListener('input', function() {
    let val = rangeSlider.value;
    let valPercentage = (rangeSlider.value / rangeSlider.max) * 100;
    percentageText.textContent = `${val}%`  
    rangeSlider.style.background = `linear-gradient(to right, #9381FF ${valPercentage}%, #fff ${valPercentage}%)`
})

submitBet.addEventListener('click', function() {
    const pendingBet = betNum.value;
    if(pendingBet <= money) {
        money -= pendingBet;
        moneyText.textContent = `$${money}`
        submitBet.classList.add('disabled')
    }
})
