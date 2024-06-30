import { Slider } from "@mui/material";

export default function YearRangeFilms({ setYearRange, yearRange }) {
  const handleYearChange = (event: Event, newValue: number | number[]) => {
    console.log("New year range:", newValue);
    setYearRange(newValue as number[]);
  };

  return (
    <Slider
      value={yearRange}
      onChange={handleYearChange}
      valueLabelDisplay="auto"
      getAriaValueText={(value) => `Год: ${value}`}
      min={1900}
      max={new Date().getFullYear()}
      step={1}
      marks={[
        { value: 1900, label: "1900" },
        {
          value: new Date().getFullYear(),
          label: `${new Date().getFullYear()}`,
        },
      ]}
    />
  );
}
