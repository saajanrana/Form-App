import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

function HomeScreen({ route, navigation }) {
  const { contacts: initialContacts } = route.params || {};
  const [contacts, setContacts] = useState(initialContacts || []);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
          console.log("User is in the home screen");
        } else {
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error in home page ", error);
      }
    };

    checkLogin();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    navigation.navigate("Login");
  };

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleEditContact = (editedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.mobile === editedContact.mobile ? editedContact : contact
    );
    setContacts(updatedContacts);
  };

  const handleDeleteContact = (mobile) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.mobile !== mobile
    );
    setContacts(updatedContacts);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to the Home Page</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <Button
        title="Add Contact"
        onPress={() =>
          navigation.navigate("AddContact", { handleAddContact })
        }
      />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.mobile}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() =>
              navigation.navigate("EditContact", {
                contact: item,
                handleEditContact,
              })
            }
          >
            {item.imageUri && (
              <Image
                source={{ uri: item.imageUri }}
                style={styles.contactImage}
              />
            )}
            <View style={styles.contactText}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactMobile}>{item.mobile}</Text>
            </View>
            <View style={styles.contactButtons}>
              <Button
                title="Edit"
                onPress={() =>
                  navigation.navigate("EditContact", {
                    contact: item,
                    handleEditContact,
                  })
                }
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteContact(item.mobile)}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:100,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  contactText: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactMobile: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  contactButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
