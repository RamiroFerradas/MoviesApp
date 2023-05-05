import { View } from "native-base";
import React from "react";
import Movies from "../../Movies/Home/Movies";
import useFavourites from "../../../Context/FavouritesContext";

export default function Favourites() {
  const { favourites } = useFavourites();
  return (
    <View width="98%" alignItems={"center"} paddingY={5} paddingBottom={20}>
      <Movies movies={favourites} loading={false} error={true} />
    </View>
  );
}
