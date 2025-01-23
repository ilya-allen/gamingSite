'use strict';

const percentageText = document.querySelector('.percentage_text');
const rangeSlider = document.querySelector('.range_slider');
rangeSlider.style.background = `linear-gradient(to right, #9381FF ${50}%, #fff ${50}%)`
const submitBet = document.querySelector('.submit_bet');
const betNum = document.querySelector('.bet_num');
const moneyText = document.querySelector('.money')
let money = 5;
let val = rangeSlider.value;

rangeSlider.addEventListener('input', function() {
    val = rangeSlider.value;
    let valPercentage = (rangeSlider.value / rangeSlider.max) * 100;
    percentageText.textContent = `${val}%`  
    rangeSlider.style.background = `linear-gradient(to right, #9381FF ${valPercentage}%, #fff ${valPercentage}%)`
})

submitBet.addEventListener('click', function() {
    const pendingBet = betNum.value;
    let multiX = 1;
    if(pendingBet <= money) {
        betNum.disabled = true;
        money -= pendingBet;
        moneyText.textContent = `$${money}`
        submitBet.classList.add('disabled')
        rangeSlider.classList.add('disabled')
        if(randomNumGenerator(val)) {
            multiX = 4 * (0.01 * val);
            console.log(multiX)
            betNum.disabled = false;
        }
    }

})

function randomNumGenerator(val) {
    const reqVal = val;
    const ranNum = Math.floor(Math.random() * 100);
    console.log(reqVal >= ranNum);
    console.log(ranNum, reqVal)
    return ranNum >= reqVal;
}
