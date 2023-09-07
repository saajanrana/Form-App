import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

function AddContactScreen({ route, navigation }) {
  // EditContact.js and AddContact.js
const { contact, handleEditContact } = route.params || {};

  const { handleAddContact } = route.params;
  const [selectedImages, setSelectedImages] = useState([]);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleAddContactPress = () => {
    const newContact = { name, mobile,imageUri: selectedImages[0]};
    handleAddContact(newContact); // Pass the new contact back to the HomeScreen
    navigation.goBack(); // Navigate back to the home screen
  };

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    setSelectedImages(files.map((f) => imgDir + f));
  };

  const selectImage = async (useLibrary) => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 7],
      quality: 0.75,
    };

    let result;

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImages([...selectedImages, imageUri]);
      console.log(imageUri);
    }
  };

  const deleteImage = async (imageUri) => {
    await FileSystem.deleteAsync(imageUri);
    setSelectedImages(selectedImages.filter((uri) => uri !== imageUri));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Contact</Text>
      <View style={styles.imageContainer}>
        {selectedImages.map((imageUri, index) => (
          <View key={index} style={styles.imageItem}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteImage(imageUri)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Add Photo"
          onPress={() => selectImage(true)}
          color="#007AFF"
        />
        <Button
          title="Capture Photo"
          onPress={() => selectImage(false)}
          color="#007AFF"
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={(text) => setMobile(text)}
      />
      <Button title="Save" onPress={handleAddContactPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  imageItem: {
    marginRight: 10,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  deleteButton: {
    backgroundColor: "red",
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default AddContactScreen;
