/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function () {

    if (gamePlaying) {
        // 1. Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "assets/images/dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "assets/images/dice-" + dice2 + ".png";

        // 3.Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            //Add Score
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }
        /*
        if(dice === 6 && lastDice === 6) {
            // player looses score
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = "0";
            nextPlayer();
        }else if (dice !== 1) {
            //Add Score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }

        lastDice = dice;
        */
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector(".final-score").value;
        var winningScore;
        // Undefined, 0, null or "" are COERCED to false
        //Anythi9ng else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner";
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //document.querySelector(".player-0-panel").classList.remove("active");
    //document.querySelector(".player-1-panel").classList.add("active");

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;


    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}

//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

//var x = document.querySelector("#score-0").textContent;
//console.log(x);