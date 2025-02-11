// ==================== Generate deck of 52 cards ====================
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var suitLetter = ["H", "D", "C", "S"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentSuitLetter = suitLetter[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardImg = cardName + currentSuitLetter + ".svg";

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
        cardImg = "A" + currentSuitLetter + ".svg";
      } else if (cardName == 11) {
        cardName = "Jack";
        cardImg = "J" + currentSuitLetter + ".svg";
      } else if (cardName == 12) {
        cardName = "Queen";
        cardImg = "Q" + currentSuitLetter + ".svg";
      } else if (cardName == 13) {
        cardName = "King";
        cardImg = "K" + currentSuitLetter + ".svg";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        image: cardImg,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

var deck = makeDeck();

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Shuffle the deck and save it in a new variable shuffledDeck
var shuffledDeck = shuffleCards(deck);

// ==================== GIFS ====================
var imageStart =
  '<img src="https://c.tenor.com/Z4adaEQmUqkAAAAd/pokemon-fighting.gif"/>';

var imageDitto =
  '<img src="https://c.tenor.com/wyK1_OZ1cKMAAAAC/pokemon-ditto.gif"/>';

var imageEnd =
  '<img src="https://c.tenor.com/l-A-6BJfekgAAAAC/ash-pok%C3%A9mon-may-pokemon.gif"/>';

var imageTieBJ =
  '<img src="https://c.tenor.com/zuGJiqsnkPIAAAAC/eevee-pikachu.gif"/>';

var imageWin =
  '<img src="https://c.tenor.com/nh5GiWZW1g4AAAAC/psyduck-floaty.gif"/>';

var imageLose =
  '<img src="https://c.tenor.com/GQVoTVtfLvoAAAAC/psyduck-farfetchd.gif"/>';

// ==================== V1 - Compare initial hands to determine winner ====================
// two players - one player and one computer
// a deck of cards
// a starting hand of 2 cards for each player
// comparing both hands and determining a winner

// Create global variables to store each player's cards
var playerHands = [];
var dealerHands = [];

// Store the value of each player's hands into a variable
var playerValue = "";
var dealerValue = "";

// Create a helper function to draw 2 cards for each player
var drawCards = function (input) {
  // Input is a numerical value to determine number of cards drawn by player
  var cardsDrawn = []; // ??? QUESTION: what's the diff between setting this as global variable vs within a function?
  var i = 0;
  while (i < input) {
    cardsDrawn.push(shuffledDeck.pop());
    i += 1;
  }
  return cardsDrawn;
};

// Derive a method to calculate the hand values
// In blackjack, ace can be 1 or 11, jack/queen/king are 10.
// Ace will have a value of 11 unless that would give the player or dealer a score in excess of 21
var calcCardValue = function (input) {
  //input is an array of card objects with name, suit and rank
  var value = Number(0);
  var i = 0;
  while (i < input.length) {
    // for jack, queen, king, value = 10
    if (input[i].rank == 11 || input[i].rank == 12 || input[i].rank == 13) {
      value += 10;

      // for ace, value = 11 or 1 if adding 11 gives an excess of 21
    } else if (input[i].rank == 1) {
      if (value + 11 <= 21) {
        value += 11;
      } else {
        value += 1;
      }

      // for all other cards, value is as is.
    } else {
      value += input[i].rank;
    }
    i += 1;
  }
  return value;
};

// Create a function for formatting suit with emoji
var emoji = function (suitName) {
  if (suitName == "Hearts") {
    return `<span style="color:red">❤</span>`;
  }

  if (suitName == "Diamonds") {
    return `<span style="color:red">♦</span>`;
  }

  if (suitName == "Clubs") {
    return "♣";
  }

  if (suitName == "Spades") {
    return "♠";
  }
};

// Create a function to reveal the cards drawn by each player
var revealCards = function (input) {
  // Input is an object with card arrays
  var cardsInHand = "";
  var i = 0;
  while (i < input.length) {
    cardsInHand += `${input[i].name} of ${emoji(input[i].suit)} <br>`;
    i += 1;
  }
  return cardsInHand;
};
// Create a function to reveal only one card of dealer's
var revealOneCard = function (input) {
  // Input is an object with card arrays
  var cardsInHand = "";
  var i = 0;
  while (i < input.length) {
    if (i == 1) {
      cardsInHand += `❔[Covered]❔ <br>`;
    } else {
      cardsInHand += `${input[i].name} of ${emoji(input[i].suit)} <br>`;
    }
    i += 1;
  }
  return cardsInHand;
};

// ==================== V2 - Add Player Hit or Stand ====================

var haveBlackjack = function (input) {
  // Input is an array of card objects
  var gotBlackjack = false;
  if (
    input[0].name == "Ace" &&
    (input[1].name == "King" ||
      input[1].name == "Queen" ||
      input[1].name == "Jack" ||
      input[1].name == "10")
  ) {
    gotBlackjack = true;
  } else if (
    input[1].name == "Ace" &&
    (input[0].name == "King" ||
      input[0].name == "Queen" ||
      input[0].name == "Jack" ||
      input[0].name == "10")
  ) {
    gotBlackjack = true;
  }
  return gotBlackjack;
};

var compareHands = function (player, dealer) {
  // Inputs are 2 numerical values
  var outputValue = "";
  if (player == dealer) {
    if (
      haveBlackjack(playerHands) == true &&
      haveBlackjack(dealerHands) == true
    ) {
      outputValue = `Tie with Blackjack. <br> ${imageTieBJ}`;
    } else if (player > 21) {
      outputValue = `It's a Tie - both bust. <br> ${imageDitto}`;
    } else {
      outputValue = `It's a Tie. <br> ${imageDitto}`;
    }
  } else if (haveBlackjack(playerHands) == true) {
    outputValue = `Player wins with Blackjack! <br> ${imageWin}`;
  } else if (haveBlackjack(dealerHands) == true) {
    outputValue = `Dealer wins with Blackjack!<br> ${imageLose}`;
  } else if (player > dealer && !(player > Number(21))) {
    outputValue = `Player wins. <br> ${imageWin}`;
  } else if (player < dealer && !(dealer > Number(21))) {
    outputValue = `Dealer wins. <br> ${imageLose}`;
  } else if (player > 21) {
    if (dealer > 21) {
      outputValue = `It's a Tie - both bust. <br> ${imageDitto}`;
    } else {
      outputValue = `Player bust. Dealer wins. <br> ${imageLose}`;
    }
  } else if (dealer > 21) {
    if (player > 21) {
      outputValue = `It's a Tie - both bust. <br> ${imageDitto}`;
    } else {
      outputValue = `Dealer bust. Player wins. <br> ${imageWin} `;
    }
  }
  return outputValue;
};

// ==================== V3 - Add Dealer Hit or Stand ====================
// Dealer to hit if 16 or under, to stand if 17 or higher

var shouldDealerHit = function (input) {
  // Takes in a numerical input of dealer hand value
  if (input <= 16) {
    return true;
  }
  return false;
};

/*
var displayCardImages = function (input) {
  var output = "";
  var cardPic = document.createElement("img");
  var j = 0;
  while (j < input.length) {
    cardPic.src = `<img class="card" src="cards/${input[j].image}" />`;
    output += cardPic.src;
    j += 1;
  }
  return output;
};

// ok the issue is that it's not recognising it as an image it's recognising it as a string.

var displayOneCardImage = function (input) {
  var cardPic = document.createElement("img");
  var k = 0;
  while (k < input.length) {
    if (k == 1) {
      cardPic.src = "cards/RED_BACK.svg";
      cardPic.setAttribute("class", "card");
      document.getElementById("computer-cards").append(cardPic);
    } else {
      cardPic.src = "cards/" + input[k].image;
      cardPic.setAttribute("class", "card");
      document.getElementById("computer-cards").append(cardPic);
    }
    k += 1;
  }
  // problem is only the else is returned and one card is appended..
  // Why can't elements be added using a function? 
};
*/

var gameMode = "deal cards";

var dealerCardDesign = document.getElementById("computer-cards");
dealerCardDesign.setAttribute("class", "hand hhand-compact");

var playerCardDesign = document.getElementById("player-cards");
playerCardDesign.setAttribute("class", "hand hhand-compact");

var main = function (input) {
  var outputMsg = "";
  if (gameMode == "deal cards") {
    gameMode = "compare cards";
    restartButton.disabled = false;
    nextButton.disabled = false;
    dealButton.disabled = true;
    playerHands = drawCards(2);
    dealerHands = drawCards(2);
    //*******To test for blackjack condition********
    // dealerHands = [
    //   { name: "Ace", suit: "Spades", rank: 1 },
    //   { name: "King", suit: "Clubs", rank: 13 },
    // ];

    // playerHands = [
    //   { name: "Ace", suit: "Hearts", rank: 1 },
    //   { name: "Queen", suit: "Diamonds", rank: 12 },
    // ];
    //**********************************************
    playerValue = calcCardValue(playerHands);
    dealerValue = calcCardValue(dealerHands);

    var dealerHFour = document.getElementById("dealer-header");
    dealerHFour.innerText = "Dealer's Hand: ";
    var playerHFour = document.getElementById("player-header");
    playerHFour.innerText = "Player's Hand: ";

    for (var i = 0; i < playerHands.length; i += 1) {
      var cardPic = document.createElement("img");
      cardPic.setAttribute("class", "card");
      cardPic.src = "cards/BLUE_BACK.svg";
      document.getElementById("player-cards").append(cardPic);
    }

    for (var i = 0; i < dealerHands.length; i += 1) {
      var cardPic = document.createElement("img");
      cardPic.setAttribute("class", "card");
      cardPic.src = "cards/RED_BACK.svg";
      document.getElementById("computer-cards").append(cardPic);
    }

    outputMsg = `<i> Dealer and Player each draws 2 cards... </i><br><br> ${imageStart} <br>Click 'Next' to begin.`;
  } else if (gameMode == "compare cards") {
    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("computer-cards").innerHTML = "";

    for (var i = 0; i < playerHands.length; i += 1) {
      var cardPic = document.createElement("img");
      cardPic.setAttribute("class", "card");
      cardPic.src = "cards/" + playerHands[i].image;
      document.getElementById("player-cards").append(cardPic);
    }

    for (var i = 0; i < dealerHands.length; i += 1) {
      var cardPic = document.createElement("img");
      cardPic.setAttribute("class", "card");
      if (i == 1) {
        cardPic.src = "cards/RED_BACK.svg";
      } else {
        cardPic.src = "cards/" + dealerHands[i].image;
      }
      document.getElementById("computer-cards").append(cardPic);
    }

    // what's the diff between append and appendChild?

    if (haveBlackjack(playerHands) == true) {
      gameMode = "dealer to hit or stand";
      outputMsg = `Player (${playerValue}):<br>${revealCards(
        playerHands
      )}<br> Dealer (❓):<br> ${revealOneCard(
        dealerHands
      )} <br><b>End of Player's turn. Dealer's turn. Click 'Next' for dealer's move.</b>`;
    } else {
      gameMode = "player to hit or stand";
      outputMsg = `Player (${playerValue}):<br>${revealCards(
        playerHands
      )}<br> Dealer (❓):<br> ${revealOneCard(
        dealerHands
      )} <br> Player, 'Hit' to draw a card, or 'Stand' to pass.`;
      standButton.disabled = false;
      hitButton.disabled = false;
      nextButton.disabled = true;
    }
  } else if (gameMode == "player to hit or stand") {
    if (input == "h") {
      playerHands.push(shuffledDeck.pop());
      playerValue = calcCardValue(playerHands);
      var cardPic = document.createElement("img");
      cardPic.setAttribute("class", "card");
      cardPic.src = "cards/" + playerHands[playerHands.length - 1].image;
      document.getElementById("player-cards").append(cardPic);
      if (playerValue >= 21) {
        gameMode = "dealer to hit or stand";
        standButton.disabled = true;
        hitButton.disabled = true;
        nextButton.disabled = false;
        outputMsg = `Player (${playerValue}):<br>${revealCards(
          playerHands
        )}<br> Dealer (❓):<br> ${revealOneCard(
          dealerHands
        )} <br><b>End of Player's turn. Dealer's turn. Click 'Next' for dealer's move.</b>`;
      } else {
        outputMsg = `Player (${playerValue}):<br>${revealCards(
          playerHands
        )}<br> Dealer (❓):<br> ${revealOneCard(
          dealerHands
        )} <br> Player, 'Hit' to draw a card, or 'Stand' to pass.`;
      }
    } else if (input == "s") {
      gameMode = "dealer to hit or stand";
      standButton.disabled = true;
      hitButton.disabled = true;
      nextButton.disabled = false;
      outputMsg = `Player (${playerValue}):<br>${revealCards(
        playerHands
      )}<br> Dealer (❓):<br> ${revealOneCard(
        dealerHands
      )} <br><b>End of Player's turn. Dealer's turn. Click 'Next' for dealer's move.</b>`;
    }
  } else if (gameMode == "dealer to hit or stand") {
    gameMode = "game over";
    while (shouldDealerHit(dealerValue) == true) {
      dealerHands.push(shuffledDeck.pop());
      dealerValue = calcCardValue(dealerHands);
    }

    document.getElementById("computer-cards").innerHTML = "";

    for (var i = 0; i < dealerHands.length; i += 1) {
      var cardPic = document.createElement("img");
      cardPic.setAttribute("class", "card");
      cardPic.src = "cards/" + dealerHands[i].image;
      document.getElementById("computer-cards").append(cardPic);
    }

    outputMsg = `Player (${playerValue}):<br>${revealCards(
      playerHands
    )}<br> Dealer (${dealerValue}):<br> ${revealCards(
      dealerHands
    )} <br><b>${compareHands(playerValue, dealerValue)}</b>`;
  } else if (gameMode == "game over") {
    document.getElementById("computer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "";
    document.getElementById("dealer-header").innerHTML = "";
    document.getElementById("player-header").innerHTML = "";

    nextButton.disabled = true;
    outputMsg = `End of Game. Click 'Restart' to play again. <br><br> ${imageEnd}`;
  }
  return outputMsg;
};

// Card images from:  http://richardschneider.github.io/cardsJS/
