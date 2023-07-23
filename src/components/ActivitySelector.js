import React from "react";
import { Button, Box, Typography } from "@mui/material";

const activities = [
  { name: "Book", verb: "read", emoji: "📚" },
  { name: "Meditate", verb: "meditated", emoji: "🧘‍♀️" },
  { name: "Music", verb: "music'd", emoji: "🎵" },
  { name: "Bath", verb: "bathed", emoji: "🛀" },
  { name: "Journal", verb: "journaled", emoji: "📖" },
  { name: "Tea", verb: "drank tea", emoji: "🍵" },
  { name: "Breathe", verb: "breathed", emoji: "💨" },
  { name: "[REDACTED]", verb: "[redacted]", emoji: "🍑" },
];

const ActivitySelector = ({ onActivityConfirm, setVerb }) => {
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
      <Typography variant="h4">What is your wind down activity?</Typography>

      {activities.map((activity, index) => (
        <Button
          key={index}
          variant="contained"
          onClick={() => {
            setVerb(activity.verb);
            onActivityConfirm(activity.name);
          }}
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
          {activity.emoji} {activity.name}
        </Button>
      ))}
    </Box>
  );
};

export default ActivitySelector;
