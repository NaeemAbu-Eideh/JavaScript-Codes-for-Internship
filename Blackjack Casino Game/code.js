const playerCards = document.getElementById("player-cards");
const dealerCards = document.getElementById("dealer-cards");
const playerScoreText = document.getElementById("player-score");
const dealerScoreText = document.getElementById("dealer-score");
const resultText = document.getElementById("result");

let deck = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

// Initialize deck
function createDeck() {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
  deck = shuffle(deck);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
  if (['J', 'Q', 'K'].includes(card.value)) return 10;
  if (card.value === 'A') return 11;
  return parseInt(card.value);
}

function updateScore(cards, isPlayer) {
  let total = 0;
  let aces = 0;

  for (let card of cards) {
    const val = getCardValue(card);
    total += val;
    if (card.value === 'A') aces++;
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  if (isPlayer) playerScore = total;
  else dealerScore = total;
}

function drawCard(isPlayer) {
  const card = deck.pop();
  const cardSpan = document.createElement("span");
  cardSpan.textContent = card.value + card.suit;

  if (isPlayer) {
    playerCards.appendChild(cardSpan);
  } else {
    dealerCards.appendChild(cardSpan);
  }

  return card;
}

function hit() {
  if (gameOver) return;
  const card = drawCard(true);
  playerHand.push(card);
  updateScore(playerHand, true);
  playerScoreText.textContent = playerScore;

  if (playerScore > 21) {
    endGame();
  }
}

function stand() {
  if (gameOver) return;
  gameOver = true;

  // Dealer draws until score >= 17
  while (dealerScore < 17) {
    const card = drawCard(false);
    dealerHand.push(card);
    updateScore(dealerHand, false);
    dealerScoreText.textContent = dealerScore;
  }

  endGame();
}

function endGame() {
  let result = "";
  if (playerScore > 21) {
    result = "You Busted! Dealer Wins!";
  } else if (dealerScore > 21) {
    result = "Dealer Busted! You Win!";
  } else if (playerScore > dealerScore) {
    result = "You Win!";
  } else if (dealerScore > playerScore) {
    result = "Dealer Wins!";
  } else {
    result = "It's a Draw!";
  }

  resultText.textContent = result;
  gameOver = true;
}

let playerHand = [];
let dealerHand = [];

function resetGame() {
  playerCards.innerHTML = "";
  dealerCards.innerHTML = "";
  resultText.textContent = "";
  playerScore = 0;
  dealerScore = 0;
  playerScoreText.textContent = "0";
  dealerScoreText.textContent = "0";
  playerHand = [];
  dealerHand = [];
  gameOver = false;

  createDeck();

  // Initial draw
  playerHand.push(drawCard(true));
  dealerHand.push(drawCard(false));
  playerHand.push(drawCard(true));
  dealerHand.push(drawCard(false));

  updateScore(playerHand, true);
  updateScore(dealerHand, false);

  playerScoreText.textContent = playerScore;
  dealerScoreText.textContent = dealerScore;
}

resetGame();
