import React, { useState, useEffect } from "react";
import ReactHowler from "react-howler";
import BedtimeSelector from "./BedtimeSelector";
import TitlePage from "./TitlePage";
import { Box } from "@mui/material";
import EnergySelector from "./EnergySelector";
import ActivitySelector from "./ActivitySelector";
import RhythmGame from "./RhythmGame";
import Explainer from "./Explainer";
import Win from "./Win";

const ObeyTheBedtime = () => {
  const [page, setPage] = useState("title");
  const [bedtime, setBedtime] = useState({});
  const [minutes, setMinutes] = useState("");
  const [verb, setVerb] = useState("");
  const [music, setMusic] = useState(null);
  const [playMusic, setPlayMusic] = useState(false);

  const handleTitleConfirm = () => {
    setPage("bedtimeSelector");
  };

  const handleBedtimeConfirm = (bedtime) => {
    setBedtime(bedtime);
    setPage("energySelector");
  };

  const handleEnergyConfirm = (energy) => {
    setMusic(energy);
    setPlayMusic(true); // Start playing the music
    setPage("activitySelector");
  };

  const handleActivityConfirm = () => {
    setPage("explainer");
  };

  const handleExplainerConfirm = () => {
    setPage("game");
  };

  const handleRetry = () => {
    setPage("explainer");
  };

  const handleWin = () => {
    setPage("win");
  };

  const handlePlayAgain = () => {
    setPlayMusic(false); // Stop the music when the game restarts
    setPage("title");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "black",
      }}
    >
      {page === "title" ? (
        <TitlePage onTitleConfirm={handleTitleConfirm} />
      ) : page === "bedtimeSelector" ? (
        <BedtimeSelector onBedtimeConfirm={handleBedtimeConfirm} />
      ) : page === "energySelector" ? (
        <EnergySelector onEnergyConfirm={handleEnergyConfirm} />
      ) : page === "activitySelector" ? (
        <ActivitySelector
          onActivityConfirm={handleActivityConfirm}
          setVerb={setVerb}
        />
      ) : page === "explainer" ? (
        <Explainer onExplainerConfirm={handleExplainerConfirm} />
      ) : page === "game" ? (
        <RhythmGame
          bedtime={bedtime}
          onRetry={handleRetry}
          onWin={handleWin}
          setMinutes={setMinutes}
        />
      ) : (
        <Win minutes={minutes} verb={verb} onPlayAgain={handlePlayAgain} />
      )}
      {/* Add the ReactHowler component here to start playing the selected music */}
      {playMusic && music && (
        <ReactHowler src={music.sound} playing={true} loop={true} />
      )}
    </Box>
  );
};

export default ObeyTheBedtime;
