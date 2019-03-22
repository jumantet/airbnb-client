import React from "react";
import { Button, Image, View, Text } from "react-native";
import { ImagePicker, Permissions } from "expo";
import { MaterialIcons } from "@expo/vector-icons";

class ImagePickerUpload extends React.Component {
  state = {
    image: null
  };

  render() {
    let { image } = this.state;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {this.state.image ? (
          <Image
            onPress={this._pickImage}
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : (
          <MaterialIcons
            name="add-a-photo"
            size={80}
            style={{
              color: "#C0C0C0",
              borderWidth: 1,
              borderColor: "#C0C0C0",
              padding: 20,
              borderRadius: 60
            }}
            onPress={this._pickImage}
          />
        )}
      </View>
    );
  }

  _pickImage = async () => {
    let { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      status = await Permissions.askAsync(Permissions.CAMERA_ROLL).status;
      if (status !== "granted") {
        return;
      } else {
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.addImage("data:image/jpeg;base64," + result.base64);
    }
  };
}

export default ImagePickerUpload;
