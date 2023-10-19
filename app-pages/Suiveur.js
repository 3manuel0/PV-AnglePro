import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import City from "./Cities.json";
import DateTimePicker from "@react-native-community/datetimepicker";
export default function Selectdata({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showList, setShowList] = useState(false);
  const [city, setCity] = useState("Choisir La Ville");
  const [latLng, setLatLng] = useState({
    lat: 0,
    lng: 0,
  });
  useEffect(() => {
    setFilteredDataSource(City);
    setMasterDataSource(City);
  }, []);
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const timDate = () => {
    return (
      <View style={[styles.smallContainer, { justifyContent: "flex-start" }]}>
        <Text style={styles.text}>Sélectionner le Temps</Text>
        <Pressable
          style={{
            backgroundColor: "#034B03",
            padding: 15,
            marginVertical: 10,
          }}
          onPress={showTimepicker}
        >
          <Text style={[styles.rowTextStyle, { color: "white", fontSize: 20 }]}>
            Choisir Le Temps
          </Text>
        </Pressable>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {date.toLocaleDateString() + " " + date.toJSON().slice(11, 16)}
        </Text>
      </View>
    );
  };
  const dateDate = () => {
    return (
      <View style={[styles.smallContainer, { justifyContent: "center" }]}>
        <Text style={styles.text}>Sélectionner la Date</Text>
        <Pressable
          style={{
            backgroundColor: "#034B03",
            padding: 15,
            marginVertical: 10,
          }}
          onPress={showDatepicker}
        >
          <Text style={[styles.rowTextStyle, { color: "white" }]}>
            Choisir La Date
          </Text>
        </Pressable>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable
        style={styles.container}
        onPress={() => {
          setShowList(false);
        }}
      >
        <View style={styles.smallContainer}>
          <Text style={styles.text}>
            Sélectionner la ville où se situe le panneau
          </Text>
          <Pressable onPress={() => setShowList(true)}>
            <Text
              style={[
                styles.rowTextStyle,
                {
                  color: "white",
                  textAlign: "center",
                  width: "100%",
                  backgroundColor: "#034B03",
                  padding: 15,
                  marginVertical: 10,
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              {city}
            </Text>
          </Pressable>
          {showList ? (
            <ScrollView
              style={{
                position: "absolute",
                zIndex: 1,
                top: "55%",
                height: "190%",
                width: "50%",
                backgroundColor: "white",
                borderRadius: 15,
              }}
              // keyboardShouldPersistTaps={"none"}
            >
              <TextInput
                style={{
                  padding: 6,
                  fontSize: 22,
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  borderWidth: 2,
                  borderColor: "lightgrey",
                  borderRadius: 10,
                }}
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Ville"
                disableFullscreenUI={false}
              />
              <View
                style={{ flex: 1, height: "100%", minHeight: 10, width: 200 }}
              >
                <FlashList
                  data={filteredDataSource}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setCity(item.name);
                        setShowList(false);
                        setLatLng({
                          lat: item.lat,
                          lng: item.lng,
                        });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          padding: 12,
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          borderBottomWidth: 2,
                          borderBottomColor: "lightgrey",
                          borderBottomEndRadius: 50,
                          textAlign: "center",
                        }}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  )}
                  estimatedItemSize={227}
                />
              </View>
            </ScrollView>
          ) : null}
        </View>
        {dateDate()}
        {timDate()}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <View
          style={[
            styles.smallContainer,
            { justifyContent: "flex-start", flex: 0.8 },
          ]}
        >
          <Pressable
            onPress={() => {
              if (city != "Choisis La Ville") {
                navigation.navigate("Calculation", {
                  city: city,
                  date: date,
                  Suiveur: true,
                  lat: latLng.lat,
                  lng: latLng.lng,
                });
              } else {
                return Alert.alert("Il faut Choisir une ville");
              }
            }}
          >
            <Text
              style={{ fontSize: 40, fontWeight: "bold", color: "#034B03" }}
            >
              Calculer
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#034B03",
  },
  smallContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    marginBottom: 10,
    fontSize: 30,
    fontFamily: "sans-serif-medium",
    color: "#034B03",
    textAlign: "center",
  },
  row: {
    backgroundColor: "white",
    width: "100%",
  },
  rowTextStyle: {
    fontSize: 20,
  },
  dropDown: {
    backgroundColor: "#EFEFEF",
    borderRadius: 12,
  },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1SelectedRowStyle: { backgroundColor: "rgba(0,0,0,0.1)" },
});
