import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";

export default function Home({ navigation }) {
  const PressHandler = () => {
    navigation.navigate("Fixe");
  };
  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.green]}>
        <Pressable onPress={PressHandler}>
          <Text style={[styles.text, styles.whiteText]}>Fixe</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate("Suiveur")}>
          <Text style={[styles.text, styles.greenText]}>Suiveur</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  green: {
    backgroundColor: "#034B03",
    width: "100%",
  },
  text: {
    fontSize: 50,
    fontFamily: "sans-serif-medium",
  },
  whiteText: {
    color: "white",
  },
  greenText: {
    color: "#034B03",
  },
});
