import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import { keyframes, css } from "@emotion/react";
import { Button, Container, Typography, Box, Link } from "@mui/material";
import { Twitter as TwitterIcon, Home as HomeIcon } from "@mui/icons-material";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Message = styled(Typography)`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const IconLink = styled(Link)`
  opacity: 0;
  transform: translateY(20px);
  animation: ${(props) =>
    css`
      ${fadeIn} 0.5s ease-in-out ${props.delay}s forwards
    `};
`;

const PlayAgainButton = styled(Button)`
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.5s ease-in-out 0.25s forwards;
`;

const BedEmoji = styled.span`
  position: relative;
  font-size: 8em;
  animation: ${fadeIn} 0.5s ease-in-out 0s forwards;
`;

const EmojiContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  top: 8%;
  left: 0%;
`;

const WinContainer = styled(Container)({
  backgroundColor: "black",
  color: "white",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  overflow: "hidden",
  position: "relative",
  userSelect: "none",
});

const Win = ({ minutes, verb, onPlayAgain }) => {
  const [showMessage, setShowMessage] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
  });

  useEffect(() => {
    const firstTimer = setTimeout(
      () => setShowMessage((prev) => ({ ...prev, first: true })),
      750
    );
    const secondTimer = setTimeout(
      () => setShowMessage((prev) => ({ ...prev, second: true })),
      1500
    );
    const thirdTimer = setTimeout(
      () => setShowMessage((prev) => ({ ...prev, third: true })),
      minutes !== 0 && minutes !== "" ? 2250 : 0
    );
    const fourthTimer = setTimeout(
      () => setShowMessage((prev) => ({ ...prev, fourth: true })),
      minutes !== 0 && minutes !== "" ? 3000 : 2250
    );
    const fifthTimer = setTimeout(
      () => setShowMessage((prev) => ({ ...prev, fifth: true })),
      3750
    );
    const sixthTimer = setTimeout(
      () => setShowMessage((prev) => ({ ...prev, sixth: true })),
      4500
    );

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
      clearTimeout(thirdTimer);
      clearTimeout(fourthTimer);
      clearTimeout(fifthTimer);
      clearTimeout(sixthTimer);
    };
  }, [minutes]);

  return (
    <WinContainer>
      {showMessage.first && <Message variant="h3">You did it.</Message>}
      {showMessage.second && (
        <Message variant="h3">You defeated all distractions.</Message>
      )}
      {showMessage.third && minutes !== 0 && minutes !== "" && (
        <Message variant="h3">
          You {verb} for {minutes} minute{minutes === 1 ? "" : "s"} before bed.
        </Message>
      )}
      {showMessage.fourth && (
        <>
          <Message variant="h3">And you obeyed the bedtime.</Message>
          <EmojiContainer>
            <BedEmoji>🛏️</BedEmoji>
          </EmojiContainer>
        </>
      )}
      {showMessage.fifth && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 3,
            mb: 3,
            justifyContent: "center",
          }}
        >
          <IconLink
            href="https://twitter.com/strangestloop"
            target="_blank"
            color="inherit"
            delay={0}
          >
            <TwitterIcon style={{ fontSize: 40 }} />
          </IconLink>
          <PlayAgainButton
            variant="contained"
            color="primary"
            onClick={onPlayAgain}
            sx={{
              width: "200px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              ":hover": {
                backgroundColor: "white",
              },
            }}
          >
            Play Again
          </PlayAgainButton>
          <IconLink href="https://strangestloop.io" color="inherit" delay={0.5}>
            <HomeIcon style={{ fontSize: 40 }} />
          </IconLink>
        </Box>
      )}
      {showMessage.sixth && (
        <Message variant="h4">(leave here for the next player)</Message>
      )}
    </WinContainer>
  );
};

export default Win;
