import { Box, Container, Stack, Typography } from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <Box
      sx={{
        width: "100%",

        position: "sticky",
        top: 0,
        height: "68px",
        zIndex: 10,
        backgroundColor: "#0077ff",
      }}
    >
      <Container sx={{ height: "100%" }}>
        <Stack
          direction={"row"}
          height={"100%"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={{ xs: "space-between" }}
        >
          <Link to="/" scroll="to-top">
            <Typography color={"black"} variant="h4">
              VK Фильмы
            </Typography>
          </Link>
          <Link to="/favourites">
            <Box
              sx={{
                color: "black",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <BookmarksIcon />
            </Box>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
