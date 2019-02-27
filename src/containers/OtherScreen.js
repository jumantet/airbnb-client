import React from "react";
import { StyleSheet, Text, View } from "react-native";

class OtherScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Autre page"
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Des choses affichées</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OtherScreen;
