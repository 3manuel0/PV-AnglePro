import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "./Home";
import Fixe from "./Fixe";
import Calculation from "./Calculation";
import Suiveur from "./Suiveur";
const screens = {
  Home: {
    screen: Home,
  },
  Fixe: {
    screen: Fixe,
  },
  Suiveur: {
    screen: Suiveur,
  },
  Calculation: {
    screen: Calculation,
  },
};
const PagesNav = createStackNavigator(screens);
export default createAppContainer(PagesNav);
