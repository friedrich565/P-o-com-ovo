const emojis = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨'];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
  }

  function createBoard() {
    // Reset variables
      cards = [];
        gameBoard.innerHTML = '';
          firstCard = null;
            secondCard = null;
              lockBoard = false;

                // Duplicate and shuffle emojis
                  const mixedEmojis = shuffle([...emojis, ...emojis]);

                    mixedEmojis.forEach((emoji, index) => {
                        const card = document.createElement('div');
                            card.classList.add('card');
                                card.dataset.emoji = emoji;
                                    card.dataset.index = index;
                                        card.innerText = '';
                                            card.addEventListener('click', handleCardClick);
                                                gameBoard.appendChild(card);
                                                    cards.push(card);
                                                      });
                                                      }

                                                      function handleCardClick(e) {
                                                        const clickedCard = e.target;

                                                          if (lockBoard || clickedCard === firstCard || clickedCard.classList.contains('matched')) return;

                                                            revealCard(clickedCard);

                                                              if (!firstCard) {
                                                                  firstCard = clickedCard;
                                                                    } else {
                                                                        secondCard = clickedCard;
                                                                            checkMatch();
                                                                              }
                                                                              }

                                                                              function revealCard(card) {
                                                                                card.innerText = card.dataset.emoji;
                                                                                  card.classList.add('revealed');
                                                                                  }

                                                                                  function hideCard(card) {
                                                                                    card.innerText = '';
                                                                                      card.classList.remove('revealed');
                                                                                      }

                                                                                      function checkMatch() {
                                                                                        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
                                                                                            firstCard.classList.add('matched');
                                                                                                secondCard.classList.add('matched');
                                                                                                    resetTurn();
                                                                                                      } else {
                                                                                                          lockBoard = true;
                                                                                                              setTimeout(() => {
                                                                                                                    hideCard(firstCard);
                                                                                                                          hideCard(secondCard);
                                                                                                                                resetTurn();
                                                                                                                                    }, 1000);
                                                                                                                                      }
                                                                                                                                      }

                                                                                                                                      function resetTurn() {
                                                                                                                                        [firstCard, secondCard] = [null, null];
                                                                                                                                          lockBoard = false;
                                                                                                                                          }

                                                                                                                                          restartButton.addEventListener('click', createBoard);

                                                                                                                                          // Start game
                                                                                                                                          createBoard();
                                                                                                                                          