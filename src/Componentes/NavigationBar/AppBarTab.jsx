import { Text } from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import { Link, useLocation } from "react-router-native";

const AppBarTab = ({ children, to }) => {
  const { pathname } = useLocation();

  const active = pathname === to;
  // const textStyles = [styles.appBar.text, active && styles.appBar.active];
  return (
    <Link to={to} component={TouchableWithoutFeedback}>
      <Text paddingHorizontal={30} color={active ? "#73aef7" : "#fff"}>
        {children}
      </Text>
    </Link>
  );
};

export default AppBarTab;
