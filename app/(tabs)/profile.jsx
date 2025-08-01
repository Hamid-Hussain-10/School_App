import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const [avatar, setAvatar] = useState(null);
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        const data = await AsyncStorage.getItem("userProfile");
        if (data) setUserData(JSON.parse(data));
      };

      const fetchAvatar = async () => {
        const uri = await AsyncStorage.getItem("userAvatar");
        if (uri) setAvatar(uri);
      };

      fetchUserData();
      fetchAvatar();
    }, [])
  );

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission Required", "Please allow access to media library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setAvatar(imageUri);
      await AsyncStorage.setItem("userAvatar", imageUri);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert("Logged out");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            avatar
              ? { uri: avatar }
              : require("../../assets/images/profile.png")
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{userData.name}</Text>

      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{userData.username}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{userData.email}</Text>

      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>{userData.phone}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    alignItems: "center",
    backgroundColor: "#fcb900",
    paddingTop: 100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    alignSelf: "flex-start",
    color: "#555",
    marginBottom: 5,
  },
  button: {
    padding: 12,
    marginTop: 30,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#cc0000",
    padding: 12,
    marginTop: 25,
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
