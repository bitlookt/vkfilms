import { Slider } from "@mui/material";
import { useState } from "react";

export default function RatingFilms({ setRatingRange, ratingRange }) {
  const handleChange = (event, newRating) => {
    setRatingRange(newRating);
  };

  return (
    <Slider
      value={ratingRange}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={(value) => `Рейтинг: ${value}`}
      min={0}
      max={10}
      step={0.1}
      marks={[
        { value: 0, label: "0" },
        { value: 10, label: "10" },
      ]}
    />
  );
}
