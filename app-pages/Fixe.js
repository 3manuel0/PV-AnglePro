import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import City from "./Cities.json";
export default function Fixe({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [showList, setShowList] = useState(false);
  const [city, setCity] = useState("Choisir La Ville");
  useEffect(() => {
    setFilteredDataSource(City);
    setMasterDataSource(City);
  }, []);
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setShowList(false);
      }}
    >
      <View style={styles.container}>
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
              top: "52%",
              height: "45%",
              width: "50%",
              backgroundColor: "white",
              borderRadius: 15,
            }}
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
                      navigation.navigate("Calculation", {
                        lat: item.lat,
                        Fixe: true,
                        city: city,
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
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#034B03",
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
