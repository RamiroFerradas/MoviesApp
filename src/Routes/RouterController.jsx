import { Route, Routes } from "react-router-native";
import RenderMovies from "../Pages/Movies/Home/RenderMovies";
import Favourites from "../Pages/Favourites/Home/Favourites";

export default function RouterController() {
  return (
    <Routes>
      <Route path="/" exact element={<RenderMovies />} />

      <Route path="/favourites" exact element={<Favourites />} />
    </Routes>
  );
}
