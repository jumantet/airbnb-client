import React from "react";
import {
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";

import Swiper from "react-native-swiper";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { MapView, Constants, Location, Permissions } from "expo";
const url = "https://airbnb-api.now.sh/";
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Accueil"
    };
  };
  state = {
    flats: [],
    buttonFlatList: true,
    location: null,
    errorMessage: null,
    isLoading: true
  };

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée"
      });
    } else {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({
        location: location
      });
    }
  };
  componentDidMount = async () => {
    const response = await axios.get(url + "api/room?city=paris");

    console.log(response.data.rooms);

    this.setState({ flats: response.data.rooms, isLoading: false });
    await this.getLocationAsync();
  };

  renderStars = (rating, reviews) => {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Ionicons key={i} name="md-star" size={20} color="#FFD700" />
        );
      } else {
        stars.push(<Ionicons key={i} name="md-star" size={20} color="grey" />);
      }
    }
    stars.push(<Text key={reviews}> {reviews} Reviews</Text>);
    return stars;
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={styles.logo}
            source={require("/Users/julianmantet/Formation/LeReacteur/ReactNative/AirbnbApp/assets/logo.svg.png")}
          />
          <ActivityIndicator />
        </View>
      );
    } else {
      return this.state.buttonFlatList === true ? (
        <>
          <View
            style={{
              height: 50,
              flexDirection: "row",
              backgroundColor: "#FF5A5F"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ buttonFlatList: true });
              }}
              style={
                this.state.buttonFlatList === true
                  ? {
                      flex: 1,
                      fontSize: 16,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomColor: "white",
                      borderBottomWidth: 4
                    }
                  : {
                      flex: 1,
                      fontSize: 16,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }
              }
            >
              <Ionicons name="md-list" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ buttonFlatList: false });
              }}
              style={
                this.state.buttonFlatList === false
                  ? {
                      flex: 1,
                      fontSize: 16,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomColor: "white",
                      borderBottomWidth: 4
                    }
                  : {
                      flex: 1,
                      fontSize: 16,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }
              }
            >
              <Ionicons name="md-map" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.container}>
            <FlatList
              data={this.state.flats}
              keyExtractor={item => String(item.shortId)}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginBottom: 10,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: "grey"
                  }}
                >
                  <Swiper
                    activeDotColor="#FF5A5F"
                    style={{ height: 250, marginBottom: 10 }}
                    showsButtons={true}
                    showsPagination={false}
                    loop={false}
                  >
                    {item.photos.map((photo, index) => {
                      return (
                        <ImageBackground
                          style={{
                            width: "100%",
                            height: 200,
                            resizeMode: "cover",
                            marginTop: 10,
                            flex: 1
                          }}
                          source={{ uri: photo }}
                          key={photo}
                        >
                          <View
                            style={{
                              position: "absolute",
                              bottom: 10,
                              left: 10,
                              height: 60,
                              borderRadius: 60,
                              width: 60,
                              backgroundColor: "#C0C0C0",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontFamily: "Avenir",
                                fontSize: 16,
                                fontWeight: "bold"
                              }}
                            >
                              {item.price}
                              {" €"}
                            </Text>
                          </View>
                        </ImageBackground>
                      );
                    })}
                  </Swiper>

                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 5,
                      marginBottom: 5
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("Flat", { id: item._id });
                    }}
                  >
                    <View>
                      <Text numberOfLines={1} style={styles.text}>
                        {item.title}
                      </Text>
                      <View
                        key={item._id}
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {this.renderStars(item.ratingValue, item.reviews)}
                      </View>
                    </View>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        resizeMode: "cover"
                      }}
                      source={{ uri: item.user.account.photos[0] }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        </>
      ) : (
        <>
          <View
            style={{
              height: 50,
              flexDirection: "row",
              backgroundColor: "#FF5A5F"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ buttonFlatList: true });
              }}
              style={
                this.state.buttonFlatList === true
                  ? {
                      flex: 1,
                      fontSize: 16,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomColor: "white",
                      borderBottomWidth: 4
                    }
                  : {
                      flex: 1,
                      fontSize: 16,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }
              }
            >
              <Ionicons name="md-list" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ buttonFlatList: false });
              }}
              style={
                this.state.buttonFlatList === false
                  ? {
                      flex: 1,
                      fontSize: 16,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomColor: "white",
                      borderBottomWidth: 4
                    }
                  : {
                      flex: 1,
                      fontSize: 16,
                      color: "white",
                      justifyContent: "center",
                      alignItems: "center"
                    }
              }
            >
              <Ionicons name="md-map" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <MapView
            style={{ flex: 1 }}
            showsUserLocation
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2
            }}
          >
            {this.state.flats !== undefined
              ? this.state.flats.map((flat, index) => (
                  <MapView.Marker
                    key={flat}
                    coordinate={{
                      latitude: flat.loc[1],
                      longitude: flat.loc[0]
                    }}
                    title={flat.title}
                    description={flat.description}
                    onCalloutPress={() =>
                      this.props.navigation.navigate("Flat", { id: flat._id })
                    }
                  >
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                      source={{ uri: flat.photos[0] }}
                    />
                  </MapView.Marker>
                ))
              : null}
          </MapView>
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  text: {
    fontFamily: "Avenir",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF5A5F",
    width: 250
  },
  logo: {
    width: "100%",
    height: 80,
    resizeMode: "contain"
  }
});

export default HomeScreen;
