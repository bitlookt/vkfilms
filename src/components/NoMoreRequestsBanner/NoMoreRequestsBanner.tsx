import { Box, Typography } from "@mui/material";

export default function NoMoreRequestsBanner() {
  return (
    <Box
      sx={{
        backgroundColor: "#ffcccb",
        padding: "16px",
        borderRadius: "8px",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h6" component="div">
        Извините, закончились бесплатные запросы на сегодня. Пожалуйста,
        попробуйте снова завтра.
      </Typography>
    </Box>
  );
}
