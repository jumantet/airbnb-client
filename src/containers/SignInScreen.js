import React from "react";
import axios from "axios";
import { AsyncStorage } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

const url = "https://airbnb-api.now.sh/";
class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  state = {
    mail: "",
    password: ""
  };

  _onPressButton = async () => {
    const newConnexion = {
      email: this.state.mail,
      password: this.state.password
    };
    const response = await axios.post(url + "api/user/log_in", newConnexion);

    const value = JSON.stringify({
      token: response.data.token,
      newConnexion
    });

    await AsyncStorage.setItem("userToken", value);
    this.props.navigation.navigate("App");
  };

  _onPressButtonSignUp = async () => {
    this.props.navigation.navigate("SignUp");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.text}>Welcome to</Text>
          <Image
            style={styles.logo}
            source={require("/Users/julianmantet/Formation/LeReacteur/ReactNative/AirbnbApp/assets/logo.svg.png")}
          />
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={-200}
          style={styles.bottomContainer}
          behavior="padding"
        >
          <View style={styles.inputs}>
            <TextInput
              keyboardType="email-address"
              placeholder="Enter your mail adress"
              textContentType="emailAddress"
              style={styles.input}
              onChangeText={mail => this.setState({ mail })}
              value={this.state.mail}
            />
            <TextInput
              textContentType="password"
              placeholder="Enter your password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>

          <TouchableOpacity onPress={this._onPressButton} style={styles.button}>
            <Text style={styles.buttonConnect}>Connect</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressButtonSignUp}
            style={styles.buttonSignUp}
          >
            <Text style={styles.buttonSignUpText}>Sign Up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100
  },
  bottomContainer: {
    flex: 2,
    alignItems: "center"
  },
  logo: {
    width: "100%",
    height: 80,
    resizeMode: "contain"
  },
  text: {
    fontFamily: "Avenir",
    fontSize: 30,
    color: "#FF5A5F"
  },
  input: {
    height: 40,
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "#FF5A5F"
  },
  inputs: {
    marginBottom: 20
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FF5A5F",
    height: 40,
    width: 200,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonConnect: {
    color: "white",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonSignUpText: {
    color: "#FF5A5F",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonSignUp: {
    marginTop: 20,
    backgroundColor: "white",
    height: 40,
    width: 200,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#FF5A5F",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SignInScreen;
