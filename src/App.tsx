import { Container } from "@mui/material";
import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailFilm from "./Page/DetailFilm";
import FavouritesFilms from "./Page/FavouritesFilms";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/films/:id" element={<DetailFilm />} />
          <Route path="/favourites" element={<FavouritesFilms />} />
          <Route path="/" element={<MainSection />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
