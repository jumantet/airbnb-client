import React from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import ImagePickerUpload from "../components/ImagePickerUpload";

const url = "http://localhost:3000/";
class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  state = {
    mail: "",
    password: "",
    userName: "",
    files: []
  };

  _handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  addImage = image => {
    let files = [...this.state.files];
    files.push(image);
    this.setState({ files: files });
  };

  handleSignUp = async () => {
    const obj = {
      email: this.state.mail,
      username: this.state.userName,
      files: this.state.files,
      password: this.state.password
    };
    console.log(obj);
    const response = await axios.post(url + "sign_up", obj);
    console.log(response.data);
    if (response.data.token) {
      this.props.navigation.navigate("AuthLoading");
    }
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
        <ImagePickerUpload addImage={this.addImage} />
        <KeyboardAvoidingView
          keyboardVerticalOffset={-200}
          style={styles.bottomContainer}
          behavior="padding"
        >
          <View style={styles.inputs}>
            <TextInput
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
              style={styles.input}
              onChangeText={value => this._handleChange("mail", value)}
              value={this.state.mail}
            />
            <TextInput
              placeholder="Username"
              style={styles.input}
              onChangeText={value => this._handleChange("userName", value)}
              value={this.state.userName}
            />
            <TextInput
              textContentType="password"
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={value => this._handleChange("password", value)}
              value={this.state.password}
            />
          </View>
          <TouchableOpacity
            onPress={this.handleSignUp}
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
  buttonSignUpText: {
    color: "white",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonSignUp: {
    marginTop: 20,
    backgroundColor: "#FF5A5F",
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
