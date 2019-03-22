import React from "react";
import {
  Button,
  StyleSheet,
  AsyncStorage,
  View,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from "react-native";
import axios from "axios";
const url = "https://airbnb-api.now.sh/";
class ProfilScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Profil"
    };
  };
  state = {
    userInfos: [],
    roomInfos: [],
    isLoading: true
  };
  renderPhoto = async () => {
    let id = this.state.userInfos.rooms[0];
    const response = await axios.get(url + `api/room/${id}`);
    console.log(response.data);
  };
  componentDidMount = async () => {
    let userInfos = [...userInfos];
    let roomInfos = [...roomInfos];
    const user = await AsyncStorage.getItem("userToken");
    const connexionInfos = JSON.parse(user);

    const response = await axios.post(
      url + "api/user/log_in",
      connexionInfos.newConnexion
    );

    userInfos.push(response.data.account);

    const responseRoom = await axios.get(
      url + `api/room/${userInfos[1].rooms[0]}`
    );

    roomInfos.push(responseRoom.data);

    console.log(responseRoom.data);
    this.setState({
      userInfos: userInfos,
      roomInfos: roomInfos,
      isLoading: false
    });
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
      if (this.state.userInfos.length > 0) {
        return (
          <ScrollView style={styles.container}>
            <View
              style={{
                alignItems: "center",
                paddingBottom: 100
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 20,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  width: Dimensions.get("window").width - 20
                }}
              >
                <Image
                  style={{ width: 150, height: 150, borderRadius: 75 }}
                  source={{ uri: this.state.userInfos[1].photos[0] }}
                />
                <Text style={styles.text}>
                  {this.state.userInfos[1].username}
                </Text>
              </View>

              <View style={{ alignItems: "flex-start", marginTop: 50 }}>
                <Text
                  style={{
                    ...styles.text,
                    color: "#FF5A5F",
                    fontWeight: "bold"
                  }}
                >
                  Description
                </Text>
                <Text style={styles.description}>
                  {this.state.userInfos[1].description}
                </Text>
                <Text
                  style={{
                    ...styles.text,
                    color: "#FF5A5F",
                    fontWeight: "bold"
                  }}
                >
                  Room
                </Text>

                <Text
                  style={{
                    width: 300,
                    fontSize: 18,
                    marginBottom: 10,
                    fontFamily: "Avenir",
                    color: "#808080",
                    fontWeight: "bold"
                  }}
                >
                  {this.state.roomInfos[1].title}
                </Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  style={{
                    width: Dimensions.get("window").width - 20,
                    height: 200
                  }}
                  source={{ uri: this.state.roomInfos[1].photos[0] }}
                />
              </View>
            </View>
          </ScrollView>
        );
      } else {
        return null;
      }
    }
  }

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 30,
    paddingBottom: 200
  },
  text: {
    paddingBottom: 10,
    fontFamily: "Avenir",
    fontSize: 20,
    color: "#808080",
    fontWeight: "bold"
  },
  description: {
    paddingBottom: 10,
    fontFamily: "Avenir"
  },
  logo: {
    width: "100%",
    height: 80,
    resizeMode: "contain"
  }
});

export default ProfilScreen;
