import { Box, TextField } from "@mui/material";

export default function SearchFilms({ handleSearchChange, searchText }) {
  return (
    <Box>
      <TextField
        onChange={handleSearchChange}
        type="search"
        placeholder="Поиск"
        value={searchText}
        variant="outlined"
        size="small"
        sx={{ width: "250px" }}
      />
    </Box>
  );
}
