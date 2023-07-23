import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

const GameContainer = styled(Container)({
  backgroundColor: "black",
  color: "white",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  overflow: "hidden",
});

const Card = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFF",
  color: "black",
  border: "2px solid black",
  padding: "16px",
  margin: "8px",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "120px",
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": {
    borderColor: "#757575",
    transform: "scale(1.02)",
  },
}));

const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const Game = ({ bedtime }) => {
  const initialDistractions = [
    { name: "Social Media", temptation: 10, distract: 2, emoji: "💬" },
    { name: "TV Binge", temptation: 15, distract: 3, emoji: "📺" },
  ];

  const initialCards = [
    {
      name: "Power Nap",
      flavorText: "Sometimes, a quick recharge is all you need!",
      resistance: 4,
      damage: 0,
    },
    {
      name: "Healthy Meal",
      flavorText: "A well-nourished body is a well-nourished mind.",
      resistance: 3,
      damage: 1,
    },
    {
      name: "Meditation",
      flavorText: "Calm your mind, resist your distractions.",
      resistance: 2,
      damage: 3,
    },
    {
      name: "Reading",
      flavorText:
        "A good book can help you unwind and distract your distractions!",
      damage: 4,
    },
    {
      name: "Warm Bath",
      flavorText: "Ease your body, ease your mind.",
      resistance: 2,
      damage: 1,
    },
    {
      name: "Jogging",
      flavorText: "A quick run can help shake off the day's stress.",
      resistance: 5,
      damage: 2,
    },
    {
      name: "Deep Breathing",
      flavorText: "Breathe in, breathe out, let it all go.",
      resistance: 1,
    },
    {
      name: "Disconnect",
      flavorText: "Sometimes, you need to unplug to recharge.",
      damage: 3,
    },
    { name: "Hot Tea", flavorText: "Sip away your worries.", resistance: 2 },
    {
      name: "Quiet Music",
      flavorText: "Let the gentle notes carry your stress away.",
      resistance: 1,
      damage: 2,
    },
    {
      name: "Write in Journal",
      flavorText: "Capture your thoughts on paper, and leave them there.",
      damage: 3,
    },
    {
      name: "Yoga",
      flavorText: "Stretch away the distractions.",
      resistance: 3,
      damage: 2,
    },
    {
      name: "Candlelight",
      flavorText: "Let the soft glow calm your mind.",
      resistance: 2,
    },
    {
      name: "Early Dinner",
      flavorText: "A satisfied stomach brings a peaceful mind.",
      resistance: 3,
      damage: 1,
    },
    {
      name: "No Caffeine",
      flavorText: "Skip the jitters, embrace the calm.",
      resistance: 4,
    },
    {
      name: "Mindful Stretching",
      flavorText: "Loosen your body, and your mind will follow.",
      damage: 3,
    },
    {
      name: "Essential Oils",
      flavorText: "A soothing scent can do wonders.",
      resistance: 1,
      damage: 2,
    },
    {
      name: "Tidy Room",
      flavorText: "A clean space makes for a clear mind.",
      resistance: 3,
    },
    {
      name: "Pet Playtime",
      flavorText: "A happy pet is a happy owner.",
      resistance: 2,
      damage: 4,
    },
    {
      name: "Plan Tomorrow",
      flavorText: "Free your mind of tomorrow’s worries today.",
      resistance: 1,
      damage: 3,
    },
  ];

  const [playerResistance, setPlayerResistance] = useState(100);
  const [currentTime, setCurrentTime] = useState(
    bedtime.hour * 60 + bedtime.minute - 60
  ); // 60 minutes before bedtime
  const [distractions, setDistractions] = useState(initialDistractions);
  const [currentDistraction, setCurrentDistraction] = useState(
    initialDistractions[0]
  );
  const [cards, setCards] = useState(initialCards);
  const [hand, setHand] = useState(initialCards.slice(0, 4));
  const [deck, setDeck] = useState(shuffle([...initialCards]));
  const [discardPile, setDiscardPile] = useState([]);

  useEffect(() => {
    // Deal four cards from the deck to start the game
    const initialHand = deck.slice(0, 4);
    const remainingDeck = deck.slice(4);

    setHand(initialHand);
    setDeck(remainingDeck);
  }); // Empty dependency array so this only runs on component mount

  const playCard = (card) => {
    setPlayerResistance(
      playerResistance + (card.resistance || 0) - currentDistraction.distract
    );
    setCurrentDistraction({
      ...currentDistraction,
      temptation: currentDistraction.temptation - (card.damage || 0),
    });
    // Move the played card to the discard pile
    setDiscardPile((currentDiscardPile) => [...currentDiscardPile, card]);

    // Remove the played card from the hand
    setHand(hand.filter((handCard) => handCard.name !== card.name));
  };

  const nextTurn = () => {
    setCurrentTime(currentTime + 5);
    setPlayerResistance(playerResistance - currentDistraction.distract);

    if (currentDistraction.temptation <= 0) {
      const newDistractions = distractions.filter(
        (d) => d.name !== currentDistraction.name
      );
      setDistractions(newDistractions);
      setCurrentDistraction(newDistractions[0]);
    }
  };

  const loseGame = () => {
    if (playerResistance <= 0) {
      alert("Game Over!");
    }
  };

  useEffect(() => {
    loseGame();
  }, [playerResistance, hand]);

  // Format time to display in HH:MM AM/PM format
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const minutesPastHour = minutes % 60;
    const ampm = "PM";
    return `${((hours - 1) % 12) + 1}:${
      minutesPastHour < 10 ? "0" : ""
    }${minutesPastHour} ${ampm}`;
  };

  const CardComponent = ({ card, playCard }) => (
    <Card onClick={() => playCard(card)}>
      <Typography variant="h6" component="div">
        {card.name}
      </Typography>
      {card.emoji && <span>{card.emoji}</span>}
      {card.resistance > 0 && (
        <Typography>Gain {card.resistance} Resistance.</Typography>
      )}
      {card.damage > 0 && <Typography>Deal {card.damage} Damage.</Typography>}
    </Card>
  );

  // Instead of buttons for each card, just add the click event on the Card itself
  const cardsComponents = hand.map((card) => (
    <CardComponent key={card.name} card={card} playCard={playCard} />
  ));

  const drawCard = () => {
    // Check if there are any cards left in the deck
    if (deck.length > 0) {
      // Draw a card from the deck and add it to the hand
      const drawnCard = deck[0];
      setHand((currentHand) => [...currentHand, drawnCard]);
      setDeck(deck.slice(1));
    } else if (discardPile.length > 0) {
      // If the deck is empty, reshuffle the discard pile to create a new deck
      const newDeck = shuffle([...discardPile]);
      setDeck(newDeck);
      setDiscardPile([]);
      const drawnCard = newDeck[0];
      setHand((currentHand) => [...currentHand, drawnCard]);
      setDeck(newDeck.slice(1));
    }
    // Do not draw a card if both the deck and the discard pile are empty
  };

  useEffect(() => {
    if (hand.length < 4 && (deck.length > 0 || discardPile.length > 0)) {
      drawCard();
    }
  }, [hand, deck, discardPile]);

  return (
    <GameContainer>
      <Container>
        <Typography variant="h4">
          Distraction: {currentDistraction.name} {currentDistraction.emoji}
        </Typography>
        <Typography variant="h5">
          Temptation: {currentDistraction.temptation}
        </Typography>
        <Typography variant="h5">
          Distract: {currentDistraction.distract}
        </Typography>
      </Container>
      <Container>
        <Typography variant="h4">
          Current Time: {formatTime(currentTime)}
        </Typography>
      </Container>
      <Container
        sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <Typography variant="h4" sx={{ width: "100%", textAlign: "center" }}>
          Resistance: {playerResistance}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          {cardsComponents}
        </Box>
      </Container>
    </GameContainer>
  );
};

export default Game;
