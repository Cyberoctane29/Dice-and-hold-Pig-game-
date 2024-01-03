"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//this function will be invoked in two situations

// So whenever we load the page for the very first time

// or also when that button is clicked

// that we were just working on, the new game

let currentScore, scores, playing, activePlayer;

const init = function () {
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

init(); //we call the function here as whenever the page is opened for the first time or being reloaded,this function will be called and everything will be in its previous state

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const numberRolled = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${numberRolled}.png`;

    if (numberRolled !== 1) {
      currentScore += numberRolled;

      //lets build id name dynamically

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //we just call the function to switch player, this was done to maintain DRY rule

      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] > 50) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // add and remove dont require the . operator to mention the class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

//I have added an additional .contains condition to check if either of them has player--winner before removing it if it has the class but just writing   player0El.classList.remove('player--winner'); without any previous check is also okay, js can handle it.

// if (player0El.classList.contains('player--winner')) {
//   player0El.classList.remove('player--winner');
// }
// if (player1El.classList.contains('player--winner')) {
//   player1El.classList.remove('player--winner');
// }

// //The same way I have added an additional .contains condition to check if either of them has player--active before adding or removing it if it has the class but just writing   player0El.classList.add('player--active'); without any previous check(to see if it exists or not for player1(0)) is also okay, js can handle it, as it will not add it if its already there.

// if (!player0El.classList.contains('player--active')) {
//   player0El.classList.add('player--active');
//   activePlayer = 0;
// }
// if (player1El.classList.contains('player--active')) {
//   player1El.classList.remove('player--active');
// }

//or we can simply write

//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');
//   activePlayer = 0;

//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
// });

btnNew.addEventListener("click", init);
// as mentioned before we can just write the function name here instead of calling it as js will call it for us

// So on this event handler here.

// And so, just like before,

// here, we now do not declare this anonymous function,

// but instead, we pass in the init function,

// which again is really just a value,

// and so it's perfectly okay to pass this value

// into this other function.

// And just keep in mind that we do not call

// this function here.

// It is JavaScript who will call the init function

// as soon as the user clicks on the new button.
