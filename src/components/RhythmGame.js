/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";
import {
  Button,
  Container,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import "../styles/clockStyles.css";

const RhythmGame = ({ bedtime, onRetry, onWin, setMinutes }) => {
  const [currentDistraction, setCurrentDistraction] = useState(null);
  const [distractionIndex, setDistractionIndex] = useState(0);
  const [whiteRadius, setWhiteRadius] = useState(Math.random() * 100 + 100);
  const [redRadius, setRedRadius] = useState(
    whiteRadius + 125 + Math.random() * 150
  );
  const [time, setTime] = useState(bedtime.hour * 60 + bedtime.minute - 60);
  const [gameOver, setGameOver] = useState(false);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [scoreMessage, setScoreMessage] = useState("");
  const [remainingMinutes, setRemainingMinutes] = useState(60);
  const [scorePosition, setScorePosition] = useState({
    top: "50%",
    left: "50%",
  });
  const [showRetryButton, setShowRetryButton] = useState(false);

  function getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const [interval, setIntervalValue] = useState(getRandomInterval(1, 3));

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const distractions = shuffle([
    { name: "Cleaning", temptation: 12, current: 12, emoji: "🧹" },
    { name: "TV", temptation: 12, current: 12, emoji: "📺" },
    { name: "Online Shopping", temptation: 12, current: 12, emoji: "🛍️" },
    { name: "Video Games", temptation: 12, current: 12, emoji: "🎮" },
    { name: "Social Media", temptation: 12, current: 12, emoji: "💬" },
    { name: "YouTube", temptation: 12, current: 12, emoji: "🎥" },
    { name: "Texting", temptation: 12, current: 12, emoji: "📱" },
  ]);

  const DistractionContainer = styled(Box)({
    position: "absolute",
    top: "10px",
    right: "25%",
    width: "50%",
    textAlign: "right",
    zIndex: 15,
  });

  const GameContainer = styled(Container)({
    backgroundColor: "black",
    color: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    userSelect: "none",
  });

  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      handleClick();
      setIntervalValue(getRandomInterval(1, 3)); // generate a new interval
      if (gameOver) {
        onRetry();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleClick = () => {
    setScorePosition(position);
    let score;
    const difference = Math.abs(redRadius - whiteRadius);
    if (difference <= 5) {
      score = 3;
      setScoreMessage("Excellent!!!");
    } else if (difference <= 12) {
      score = 2;
      setScoreMessage("Good!");
    } else if (difference <= 20) {
      score = 1;
      setScoreMessage("Decent...");
    } else {
      score = 0;
      setScoreMessage("Bad.");
    }

    setCurrentDistraction({
      ...currentDistraction,
      current: currentDistraction.current - score,
    });

    setTime(time + 1);
    setRemainingMinutes(remainingMinutes - 1);
    setWhiteRadius(Math.random() * 100 + 100);
    setRedRadius(whiteRadius + 125 + Math.random() * 150);
    setTimeout(() => {
      setScoreMessage("");
    }, 500);
  };

  useEffect(() => {
    setCurrentDistraction(distractions[distractionIndex]);
  }, [distractionIndex]);

  useEffect(() => {
    setPosition({
      top: `${
        Math.random() < 0.5 ? Math.random() * 35 + 5 : Math.random() * 30 + 65
      }%`,
      left: `${
        Math.random() < 0.5 ? Math.random() * 35 + 5 : Math.random() * 30 + 65
      }%`,
    });
  }, [currentDistraction]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (redRadius > 0) {
        setRedRadius(redRadius - 1);
      } else {
        handleClick();
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [redRadius, interval]); // note the added dependency here

  useEffect(() => {
    if (currentDistraction && currentDistraction.current <= 0) {
      setDistractionIndex((prevIndex) => prevIndex + 1);
    }
  }, [currentDistraction]);

  useEffect(() => {
    const bedtimeInMinutes = bedtime.hour * 60 + bedtime.minute;
    if (currentDistraction && !gameOver) {
      if (distractionIndex >= distractions.length && time < bedtimeInMinutes) {
        setMinutes(remainingMinutes);
        onWin();
      } else if (time >= bedtimeInMinutes) {
        setGameOver(true);
        setShowRetryButton(true);
      }
    }
  }, [currentDistraction, time, bedtime, gameOver, distractionIndex]);

  return (
    <GameContainer onClick={handleClick}>
      <Clock
        value={new Date(2023, 7, 22, Math.floor(time / 60), time % 60)}
        size="350px"
        hourHandWidth="10"
        minuteHandWidth="10"
        minuteMarksWidth="4"
        hourMarksLength="15"
      />
      <Typography variant="h4" mt={1}>
        Bedtime in {remainingMinutes} minute{remainingMinutes === 1 ? "" : "s"}
        {gameOver && (
          <>
            <br />
            You lose!
          </>
        )}
      </Typography>

      <Typography
        variant="h3"
        style={{
          color: "yellow",
          position: "absolute",
          top: scorePosition.top,
          left: scorePosition.left,
        }}
      >
        {scoreMessage}
      </Typography>
      {!gameOver && currentDistraction && (
        <Box>
          <DistractionContainer>
            <Typography
              variant="body1"
              sx={{ fontSize: "2em" }} // adjust as needed
            >
              {currentDistraction?.name}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                (currentDistraction?.current / currentDistraction?.temptation) *
                100
              }
              sx={{
                height: "10px",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "red",
                },
              }} // adjust as needed
            />
          </DistractionContainer>
          <Box
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              width: `${whiteRadius}px`,
              height: `${whiteRadius}px`,
              border: "3px solid white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <Typography
              variant="h2"
              style={{ zIndex: 2 }}
              onClick={handleClick}
            >
              {currentDistraction.emoji}
            </Typography>
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: `${redRadius}px`,
                height: `${redRadius}px`,
                borderRadius: "50%",
                border: "3px solid red",
                zIndex: 0,
              }}
            />
          </Box>
        </Box>
      )}
      {showRetryButton && (
        <Typography variant="h6">Press space to try again.</Typography>
      )}
    </GameContainer>
  );
};

export default RhythmGame;
