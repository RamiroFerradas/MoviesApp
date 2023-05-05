import { ScrollView, View } from "native-base";

import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";

export default function NavigationBar() {
  return (
    <View
      // flexDirection={"row"}
      paddingTop={Constants.statusBarHeight - 20}
      paddingBottom={2}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ScrollView horizontal>
        <AppBarTab to="/">Buscador</AppBarTab>
        <AppBarTab to="/favourites">Favoritos</AppBarTab>
      </ScrollView>
    </View>
  );
}
