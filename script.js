'use strict';

const balance = document.querySelector('.money')
const mines = document.querySelectorAll('.mine');
const submitButton = document.querySelector('.button_depo');
const betField = document.querySelector('.money_depo');
const cashoutValue = document.querySelector('.cashout')
const cashoutButton = document.querySelector('.button_withdraw')

let randomChosenMine = Math.floor(Math.random() * 16) + 1

let c = 0;
let cashout = 0;
let overallMoney = 5;
let multiplier = 0;
let minesClicked = 0;
let clickableMines = false;

submitButton.addEventListener('click', function() {
    if (betField.value <= overallMoney && betField.value >= 1 ) {
        multiplier = 0;
        balance.textContent = `$${overallMoney - betField.value}`
        overallMoney -= betField.value
        clickableMines = true;
        betField.disabled = true;
        resetMines();
        cashout = Number(betField.value);
        cashoutValue.textContent = `$${String(cashout)}`
        

        mines.forEach(function(i) {
            c++
            if (c == randomChosenMine) {
                i.classList.add('broken')
            }
            console.log('yes')
        })

        
        
        cashoutButton.addEventListener('click', function() {
            if(minesClicked >= 1) {
                console.log('yur')
                clickableMines = false;
                overallMoney += cashout;
                overallMoney = Number(overallMoney.toFixed(2))
                balance.textContent = `$${String(overallMoney)}`
                resetValues();
            }
        })

    } 
    
})

mines.forEach(function(i) {
    i.addEventListener('click', function() {
        if (clickableMines == true) {
            if (i.classList.contains('broken')) {
                i.classList.add('clicked')
                clickableMines = false;
                resetValues()
                setTimeout(function() {
                    i.src='bad_mine.png';

                }, 250)
    
            } else if (!i.classList.contains('broken')) {
                i.classList.add('clicked')
                console.log('yessss')
                minesClicked++;
                console.log(minesClicked)
                multiplier = (1.1 ** minesClicked).toFixed(2)
                console.log(multiplier)
                cashout = Number(betField.value) * multiplier;
                cashoutValue.textContent = `$${String(cashout.toFixed(2))}`
                setTimeout(function() {
                    i.src='good_mine.png'
                }, 250)
            }
        }
    })
})

function resetValues() {
    cashout = 0;
    cashoutValue.textContent = "$0"
    betField.textContent = 0;
    c = 0;
    betField.disabled = false;
    betField.value = '';
    multiplier = 0;
    minesClicked = 0
}

function resetMines() {
    mines.forEach(function(i) {
        if (i.classList.contains('clicked')) {
            i.classList.remove('clicked')
            i.src='mine.png'
        }
    })
}