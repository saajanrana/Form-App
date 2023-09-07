import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
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

function EditContactScreen({ route, navigation }) {
  const { contact, handleEditContact } = route.params;
  const [name, setName] = useState(contact.name);
  const [mobile, setMobile] = useState(contact.mobile);
  const [selectedImage, setSelectedImage] = useState(contact.imageUri);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
  };

  const selectImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 7],
      quality: 0.75,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
    }
  };

  const deleteImage = async () => {
    setSelectedImage(null);
  };

  const handleSaveContact = () => {
    const editedContact = {
      name,
      mobile,
      imageUri: selectedImage,
    };
    handleEditContact(editedContact); // Pass the edited contact back to the HomeScreen
    navigation.goBack(); // Navigate back to the home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Contact</Text>
      <View style={styles.imageContainer}>
        {selectedImage && (
          <View style={styles.roundImageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.roundImage} />
          </View>
        )}
        <TouchableOpacity style={styles.smallButton} onPress={selectImage}>
          <Text style={styles.smallButtonText}>Select Image</Text>
        </TouchableOpacity>
        {selectedImage && (
          <TouchableOpacity
            style={styles.smallButton}
            onPress={deleteImage}
          >
            <Text style={styles.smallButtonText}>Delete Image</Text>
          </TouchableOpacity>
        )}
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
      <Button title="Save Contact" onPress={handleSaveContact} />
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
  input: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  roundImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16,
  },
  roundImage: {
    width: "100%",
    height: "100%",
  },
  smallButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  smallButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditContactScreen;
