import { StyleSheet, Text, View, Image } from "react-native";
export default function Calculation({ navigation }) {
  const showFixe = () => {
    if (navigation.getParam("Fixe")) {
      return (
        <View style={styles.container}>
          <Text style={styles.mainText}>{navigation.getParam("city")}</Text>
          <View style={styles.container2}>
            <Text style={styles.secondaryText}>
              La position optimale durant toute l'année:
            </Text>
            <Text style={[styles.secondaryText, styles.Numbers]}>
              {(0.85666 * navigation.getParam("lat") + 0.33333).toFixed(2) +
                "°"}
            </Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.secondaryText}>
              La position parfaite durant l'hiver:
            </Text>
            <Text style={[styles.secondaryText, styles.Numbers]}>
              {(0.88 * navigation.getParam("lat") + 19).toFixed(2) + "°"}
            </Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.secondaryText}>
              La position parfaite durant l'été:
            </Text>
            <Text style={[styles.secondaryText, styles.Numbers]}>
              {(0.93 * navigation.getParam("lat") - 21).toFixed(2) + "°"}
            </Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.secondaryText}>
              La position parfaite durant l'automn et le printemps:
            </Text>
            <Text style={[styles.secondaryText, styles.Numbers]}>
              {(0.76 * navigation.getParam("lat") + 3).toFixed(2) + "°"}
            </Text>
          </View>
        </View>
      );
    }
  };
  const Suiveur = () => {
    if (navigation.getParam("Suiveur")) {
      const date = navigation.getParam("date");
      const numberOfDays = Math.ceil(
        (new Date(date.getTime()) - new Date(date.getFullYear(), 0, 1)) /
          86400000
      );
      const lat = navigation.getParam("lat");
      const a =
        23.45 * Math.sin(((360 / 365) * (284 + numberOfDays) * Math.PI) / 180);
      const minutes = date.getMinutes() / 60;
      const b = 15 * (date.getHours() + minutes - 12);
      return (
        <View style={styles.container}>
          <View
            style={[
              styles.container2,
              {
                padding: 0,
                margin: 0,
                minHeight: "35%",
                justifyContent: "space-around",
              },
            ]}
          >
            <Text style={[styles.mainText]}>
              {navigation.getParam("city") +
                " " +
                date.toLocaleDateString() +
                " " +
                date.getHours() +
                ":" +
                date.toJSON().slice(14, 16)}
            </Text>
            <Text style={styles.secondaryText}>
              {"l'angle horizental estimée :" +
                " " +
                (
                  (Math.asin(
                    Math.sin((a * Math.PI) / 180) *
                      Math.sin((lat * Math.PI) / 180) +
                      Math.cos((a * Math.PI) / 180) *
                        Math.cos((b * Math.PI) / 180) *
                        Math.cos((lat * Math.PI) / 180)
                  ) *
                    180) /
                  Math.PI
                ).toFixed(2) +
                "°"}
            </Text>
            <Text style={styles.secondaryText}>
              {"l'angle verticale estimée :" + " " + a.toFixed(2) + "°"}
            </Text>
          </View>
          <View
            style={[
              styles.container2,
              {
                padding: 10,
                flex: 1,
                padding: 0,
                margin: 0,
                minHeight: "60%",
              },
            ]}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "stretch",
              }}
              source={require("../assets/pv.png")}
            ></Image>
          </View>
        </View>
      );
    }
  };
  return (
    <>
      {Suiveur()}
      {showFixe()}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  container2: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    margin: 0,
    justifyContent: "center",
  },
  mainText: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    marginBottom: 10,
    textAlign: "center",
    width: "100%",
  },
  secondaryText: {
    fontSize: 21,
    fontWeight: "bold",
    paddingHorizontal: 15,
    fontFamily: "sans-serif",
    textAlign: "center",
    width: "100%",
  },
  Numbers: {
    width: "100%",
    textAlign: "center",
  },
});
