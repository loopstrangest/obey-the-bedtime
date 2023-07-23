import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "@mui/material";
import { gsap } from "gsap";

// Define keyframes for your animations
const descend = keyframes`
  0% { transform: translateY(-50%); }
  100% { transform: translateY(0); }
`;

// Style your elements with the animations
const DescendText = styled.h1`
  animation: ${descend} 1s ease-in-out;
  font-size: 4em;
  text-align: center;
  position: absolute;
  width: 100%;
`;

const WordOne = styled(DescendText)`
  top: 16.5%;
`;

const WordTwo = styled(DescendText)`
  top: 26.5%;
`;

const Moon = styled.span`
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 5em;
  color: white;
`;

const TitlePage = ({ onTitleConfirm }) => {
  const [step, setStep] = useState(0);
  const bgRef = useRef(null);
  const timer = useRef();

  useEffect(() => {
    timer.current = setTimeout(() => {
      setStep(step + 1);
    }, 750);

    if (step === 3) {
      gsap.to(bgRef.current, {
        duration: 1,
        backgroundColor: "black",
        ease: "none",
        force3D: true,
        overwrite: true,
      });
    }

    return () => clearTimeout(timer.current);
  }, [step]);

  return (
    <div
      ref={bgRef}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        transition: "all 0.5s",
      }}
    >
      {step > 0 && <WordOne>OBEY</WordOne>}
      {step > 1 && <WordTwo>THE</WordTwo>}
      {step > 2 && (
        <Button
          variant="contained"
          onClick={onTitleConfirm}
          sx={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "4em",
            fontWeight: "bold",
            width: "auto",
            backgroundColor: "white",
            color: "black",
            marginTop: 4,
            ":hover": {
              backgroundColor: "white",
            },
          }}
        >
          BEDTIME
        </Button>
      )}
      {step > 3 && <Moon>🌙</Moon>}
    </div>
  );
};

export default TitlePage;
