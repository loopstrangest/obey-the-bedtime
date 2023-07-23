import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Typography } from "@mui/material";

const BedtimeSelector = ({ onBedtimeConfirm }) => {
  const [selectedHour, setSelectedHour] = useState(10);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const increaseHour = (e) => {
    if (selectedHour === 12) {
      setSelectedHour(8);
    } else {
      setSelectedHour(selectedHour + 1);
      if (selectedHour + 1 === 12) {
        setSelectedMinute(0);
      }
    }
  };

  const decreaseHour = (e) => {
    if (selectedHour === 8) {
      setSelectedHour(12);
      setSelectedMinute(0);
    } else setSelectedHour(selectedHour - 1);
  };

  const increaseMinute = (e) => {
    if (selectedHour !== 12) {
      if (selectedMinute === 55) {
        setSelectedMinute(0);
      } else setSelectedMinute(selectedMinute + 5);
    }
  };

  const decreaseMinute = (e) => {
    if (selectedHour !== 12) {
      if (selectedMinute === 0) {
        setSelectedMinute(55);
      } else setSelectedMinute(selectedMinute - 5);
    }
  };

  const getTimePeriod = () => {
    if (selectedHour === 12 && selectedMinute === 0) {
      return "AM";
    } else {
      return "PM";
    }
  };

  const handleConfirm = () => {
    onBedtimeConfirm({
      hour: selectedHour,
      minute: selectedMinute,
      period: getTimePeriod(),
    });
  };

  return (
    <Box sx={{ color: "white", userSelect: "none" }}>
      <Typography variant="h4">What is your bedtime?</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 4,
          width: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: 2,
          }}
        >
          <KeyboardArrowUpIcon
            onClick={increaseHour}
            sx={{ fontSize: 40, cursor: "pointer" }}
          />
          <Typography variant="h4" sx={{ userSelect: "none" }}>
            {selectedHour < 10 ? `0${selectedHour}` : selectedHour}
          </Typography>
          <KeyboardArrowDownIcon
            onClick={decreaseHour}
            sx={{ fontSize: 40, cursor: "pointer" }}
          />
        </Box>

        <Typography variant="h4" sx={{ userSelect: "none" }}>
          :
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: 2,
          }}
        >
          <KeyboardArrowUpIcon
            onClick={selectedHour === 12 ? null : increaseMinute}
            sx={{
              fontSize: 40,
              color: selectedHour === 12 ? "gray" : "inherit",
              cursor: selectedHour === 12 ? "inherit" : "pointer",
            }}
          />
          <Typography variant="h4" sx={{ userSelect: "none" }}>
            {selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}
          </Typography>
          <KeyboardArrowDownIcon
            onClick={selectedHour === 12 ? null : decreaseMinute}
            sx={{
              fontSize: 40,
              color: selectedHour === 12 ? "gray" : "inherit",
              cursor: selectedHour === 12 ? "inherit" : "pointer",
            }}
          />
        </Box>

        <Typography variant="h4" sx={{ marginLeft: 2, userSelect: "none" }}>
          {getTimePeriod()}
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={handleConfirm}
        sx={{
          width: "200px",
          backgroundColor: "white",
          color: "black",
          marginTop: 4,
          ":hover": {
            backgroundColor: "white",
          },
        }}
      >
        <CheckIcon />
      </Button>
    </Box>
  );
};

export default BedtimeSelector;
