'use strict';

const dealersCards = document.querySelector('.dealer_cards')
const playersCards = document.querySelector('.player_cards')
const hitButton = document.querySelector('.hit_button')
const standButton = document.querySelector('.stand_button')
const submitButton = document.querySelector('.button_depo')
const betField = document.querySelector('.money_depo');
const moneyText = document.querySelector('.money')
let cards = document.querySelectorAll('.card')
const dealerText = document.querySelector('.text_dealer')
const playerText = document.querySelector('.text_player')
const playerCardsChildren = playersCards.children
const dealerCardsChildren = dealersCards.children

let overallMoney = 5;


let playerCount = 0;
let dealerCount = 0;
let dealerHiddenCard = 0;

hitButton.disabled = true
standButton.disabled = true;

function ranNum() {
    return Math.trunc(Math.random() * 9) + 2;
}



function resetCards() {
    let c = 0;
    dealerCount = 0;
    playerCount = 0;
    playerText.textContent = `Player Cards`

    cards.forEach(function(i) {
        let randomNum = ranNum()
        i.src = `card_${randomNum}.png`
        console.log(i)
        if (c < 1) {
            dealerCount += randomNum               

        } else if (c == 1) {
            i.src = `hidden.png`
            dealerCount += randomNum   
            dealerHiddenCard = randomNum; 
        } else if (c >= 2) {
            playerCount += randomNum
        }
        c++
    })
    console.log(cards)


    for(let i=playerCardsChildren.length; i != 1; i--){
        if (i > 2) {
            playerCardsChildren[i - 1].remove()
        }
    }

    for(let i=dealerCardsChildren.length; i != 1; i--){
        if (i > 2) {
            dealerCardsChildren[i - 1].remove()
        }
    }

    playerText.textContent = `Player Cards: ${playerCount}`
    dealerText.textContent = 'Dealer Cards'
}

function flipHidden() {
    let c = 0;
    cards.forEach(function(i) {
        if (c == 1) {
            i.src = `card_${dealerHiddenCard}.png`
        }
        c++
    })
}



hitButton.addEventListener('click', hitPlayer)
standButton.addEventListener('click', standPlayer)

function hitPlayer() {
    if (playerCount <= 21) {
        let randomNum = Math.trunc(Math.random() * 9) + 2;
        const anotherCard = document.createElement('img');
        anotherCard.classList.add('card')
        anotherCard.classList.add('new_card')
        let cardAttribute = `card_${randomNum}.png`
        anotherCard.setAttribute('src', cardAttribute)
        playersCards.appendChild(anotherCard)
        playerCount += randomNum
        playerText.textContent = `Player Cards: ${playerCount}`    
    }
    if (playerCount > 21) {
        playerText.textContent = `Player Cards: ${playerCount} BUST`
        standPlayer();
        hitButton.disabled = true
        standButton.disabled = true;
        betField.value = '';

    }
}

function standPlayer() {
    flipHidden();
    dealerText.textContent = `Dealer Cards: ${dealerCount}`

    while(dealerCount < 17) {
        let randomNum = ranNum();
        const anotherCard = document.createElement('img');
        anotherCard.classList.add('card')
        anotherCard.classList.add('new_card')
        let cardAttribute = `card_${randomNum}.png`
        anotherCard.setAttribute('src', cardAttribute)
        dealersCards.appendChild(anotherCard)
        dealerCount += randomNum
        dealerText.textContent = `Dealer Cards: ${dealerCount}`
    }

    //////////////////////
    // Deal With Player
    //////////////////////

    if (playerCount > dealerCount && playerCount < 22) {
        overallMoney += (betField.value * 2)
        hitButton.disabled = true
        standButton.disabled = true;
        betField.value = '';
        moneyText.textContent = `$${overallMoney}`
    }

    if (dealerCount > 21 && playerCount < 22) {
        overallMoney += (betField.value * 2)
        hitButton.disabled = true
        standButton.disabled = true;
        betField.value = '';
        moneyText.textContent = `$${overallMoney}`
    }

    if (dealerCount > playerCount && dealerCount < 22) {
        hitButton.disabled = true
        standButton.disabled = true;
        betField.value = '';
        moneyText.textContent = `$${overallMoney}`
    }

    if (dealerCount == playerCount) {
        overallMoney += Number(betField.value)
        hitButton.disabled = true
        standButton.disabled = true;
        betField.value = '';
        moneyText.textContent = `$${overallMoney}`
    }

}

submitButton.addEventListener('click', function() {
    if(betField.value <= overallMoney) {
        hitButton.disabled = false;
        standButton.disabled = false;
        overallMoney -= betField.value;
        moneyText.textContent = `$${overallMoney}`
        resetCards()
    }

    
})