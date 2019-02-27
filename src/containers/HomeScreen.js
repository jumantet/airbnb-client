import React from "react";
import { Button, View } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Accueil"
    };
  };

  render() {
    return (
      <View>
        <Button title="Aller sur une autre page" onPress={this.showMoreApp} />
      </View>
    );
  }

  showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };
}

export default HomeScreen;
