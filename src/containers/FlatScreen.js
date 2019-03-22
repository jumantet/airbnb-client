import React from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import Swiper from "react-native-swiper";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { MapView } from "expo";

const url = "https://airbnb-api.now.sh/";
class FlatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Appartement",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#FF5A5F"
      }
    };
  };
  state = {
    flatInfos: {},
    numberOfLines: 3,
    isActive: true,
    isLoading: true
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

  renderCarousel = photos => {
    return (
      <Swiper
        activeDotColor="#FF5A5F"
        style={{ height: 200, marginBottom: 10 }}
        showsButtons={true}
        showsPagination={false}
        loop={false}
      >
        {photos.map((photo, index) => {
          return (
            <ImageBackground
              style={{
                width: "100%",
                height: 200,
                resizeMode: "cover",
                marginVertical: 10,
                flex: 1
              }}
              source={{ uri: photo }}
              key={index}
            />
          );
        })}
      </Swiper>
    );
  };

  componentDidMount = async () => {
    let id = this.props.navigation.state.params.id;

    const response = await axios.get(url + `api/room/${id}`);

    await this.setState({ flatInfos: response.data, isLoading: false }, () => {
      console.log(this.state);
    });
  };
  render() {
    let photos = this.state.flatInfos.photos;
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
      return (
        <>
          <ScrollView style={{ flex: 1 }}>
            {photos ? this.renderCarousel(photos) : null}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                marginHorizontal: 15
              }}
            >
              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    width: 300,
                    fontSize: 20,
                    fontFamily: "Avenir",
                    fontWeight: "bold"
                  }}
                >
                  {this.state.flatInfos.title}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {this.renderStars(
                    this.state.flatInfos.ratingValue,
                    this.state.flatInfos.reviews
                  )}
                </View>
              </View>

              {this.state.flatInfos.user ? (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    resizeMode: "cover"
                  }}
                  source={{ uri: this.state.flatInfos.user.account.photos[0] }}
                />
              ) : null}
            </View>
            <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
              <Text
                style={{ fontFamily: "Avenir", fontSize: 16 }}
                numberOfLines={this.state.numberOfLines}
              >
                {this.state.flatInfos.description}
              </Text>
              <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={() => {
                  if (this.state.isActive === true) {
                    this.setState({ numberOfLines: null, isActive: false });
                  } else {
                    this.setState({ numberOfLines: 3, isActive: true });
                  }
                }}
              >
                {this.state.isActive === true ? (
                  <Text style={{ color: "#1E90FF", fontSize: 16 }}>
                    See More
                  </Text>
                ) : (
                  <Text style={{ color: "#1E90FF", fontSize: 16 }}>Hide</Text>
                )}
              </TouchableOpacity>
            </View>
            {this.state.flatInfos.loc ? (
              <MapView
                style={{ flex: 1, height: 200 }}
                initialRegion={{
                  latitude: this.state.flatInfos.loc[1],
                  longitude: this.state.flatInfos.loc[0],
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03
                }}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: this.state.flatInfos.loc[1],
                    longitude: this.state.flatInfos.loc[0]
                  }}
                  title={this.state.flatInfos.title}
                  description={this.state.flatInfos.description}
                />
              </MapView>
            ) : null}
          </ScrollView>
        </>
      );
    }
  }
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 80,
    resizeMode: "contain"
  }
});
export default FlatScreen;
