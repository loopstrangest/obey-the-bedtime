import React, { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";
import { Button, Typography, Box } from "@mui/material";

const Explainer = ({ onExplainerConfirm }) => {
  const [redRadius, setRedRadius] = useState(window.innerWidth * 0.6 * 0.5);
  const whiteRadius = window.innerWidth * 0.25 * 0.5;
  const [showButton, setShowButton] = useState(false);

  const CircleContainer = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  });

  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      if (showButton) {
        onExplainerConfirm();
      } else {
        setShowButton(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showButton, onExplainerConfirm]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (redRadius > whiteRadius) {
        setRedRadius(redRadius - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [redRadius]);

  return (
    <div
      style={{
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
      }}
    >
      <Box
        sx={{
          backgroundColor: "black",
          padding: 2,
          borderRadius: 1,
          zIndex: 50,
        }}
      >
        <Typography variant="h3">Defeat the distractions!</Typography>
        <Typography variant="h3">
          Press <strong>space</strong> when the circles are the{" "}
          <strong>same size</strong>!!
        </Typography>
        <Typography variant="h3">
          Defeat all distractions before bedtime!!!
        </Typography>
      </Box>
      {!showButton && (
        <CircleContainer>
          <Box
            style={{
              width: `${whiteRadius * 2}px`,
              height: `${whiteRadius * 2}px`,
              border: "3px solid white",
              borderRadius: "50%",
              zIndex: 20,
            }}
          />
          <Box
            style={{
              position: "absolute",
              width: `${redRadius * 2}px`,
              height: `${redRadius * 2}px`,
              border: "3px solid red",
              borderRadius: "50%",
            }}
          />
        </CircleContainer>
      )}
      {showButton && (
        <Button
          style={{ zIndex: 11 }}
          variant="contained"
          onClick={onExplainerConfirm}
          sx={{
            mt: 2,
            width: "200px",
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "white",
            },
          }}
        >
          Understood!
        </Button>
      )}
    </div>
  );
};

export default Explainer;
