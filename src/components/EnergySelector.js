import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import ReactHowler from "react-howler";
import CheckIcon from "@mui/icons-material/Check";

const energies = [
  {
    name: "Hidden",
    emoji: "😶",
    sound: "/sounds/ES_Shadowed - John B. Lund.mp3",
  },
  {
    name: "Relaxed",
    emoji: "😌",
    sound: "/sounds/ES_Dagslanda - Ave Air.mp3",
  },
  {
    name: "Mischievous",
    emoji: "😏",
    sound: "/sounds/ES_Zeroing - Out To The World.mp3",
  },
];

const EnergySelector = ({ onEnergyConfirm }) => {
  const [selectedEnergy, setSelectedEnergy] = useState(null);
  const [playSound, setPlaySound] = useState(false);

  const handleEnergySelect = (energy) => {
    setSelectedEnergy(energy);
    setPlaySound(true);
  };

  const handleConfirm = () => {
    setPlaySound(false); // Stop the music
    onEnergyConfirm(selectedEnergy);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        p: 2,
        gap: 2,
      }}
    >
      <Typography variant="h4">What is your nighttime energy?</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          mb: 2,
        }}
      >
        {energies.map((energy, index) => (
          <Box
            key={index}
            onClick={() => handleEnergySelect(energy)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              cursor: "pointer",
              padding: 3,
              color: selectedEnergy === energy ? "white" : "black",

              border:
                selectedEnergy === energy
                  ? "3px solid white"
                  : "3px solid black",
            }}
          >
            <Typography variant="h2">{energy.emoji}</Typography>
          </Box>
        ))}
      </Box>

      {selectedEnergy && (
        <Button
          variant="contained"
          onClick={handleConfirm} // Update this line
          sx={{
            mx: 5,
            width: "200px",
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "white",
            },
          }}
        >
          <CheckIcon />
        </Button>
      )}

      {selectedEnergy && playSound && (
        <ReactHowler
          src={selectedEnergy.sound}
          playing={true}
          loop={true}
          onEnd={() => setPlaySound(false)}
        />
      )}
    </Box>
  );
};

export default EnergySelector;
