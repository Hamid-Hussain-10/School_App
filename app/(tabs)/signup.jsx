import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const [secure, setSecure] = useState(true);
  const router = useRouter();

  const [formFields, setFormFields] = useState([
    { name: "name", placeholder: "Your Name", keyboardType: "default", value: "" },
    { name: "username", placeholder: "Your Username", keyboardType: "default", value: "" },
    { name: "phone", placeholder: "Your Phone Number", keyboardType: "phone-pad", value: "" },
    { name: "email", placeholder: "Your E-mail", keyboardType: "email-address", value: "" },
    { name: "password", placeholder: "Password", keyboardType: "default", value: "" },
  ]);

  const updateField = (fieldName, newValue) => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.name === fieldName ? { ...field, value: newValue } : field
      )
    );
  };

  const handleSignup = async () => {
    const emptyField = formFields.find((f) => f.value.trim() === "");
    if (emptyField) {
      Alert.alert("Error", `${emptyField.placeholder} is required.`);
      return;
    }

    const emailField = formFields.find((f) => f.name === "email");
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(emailField.value)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    const formData = {};
    formFields.forEach((f) => (formData[f.name] = f.value));

    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(formData));
      Alert.alert("Success", "You have signed up successfully!");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", "Failed to save user data.");
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text1}>Sign Up</Text>

      <View style={styles.inputcontainer}>
        {formFields.map((field) => {
          if (field.name === "password") {
            return (
              <View key={field.name} style={styles.passwordWrapper}>
                <TextInput
                  style={[styles.input, { flex: 1, marginTop: 0 }]}
                  placeholder={field.placeholder}
                  secureTextEntry={secure}
                  keyboardType={field.keyboardType}
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                  value={field.value}
                  onChangeText={(text) => updateField(field.name, text)}
                />
                <TouchableOpacity
                  onPress={() => setSecure(!secure)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={secure ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TextInput
              key={field.name}
              style={styles.input}
              placeholder={field.placeholder}
              keyboardType={field.keyboardType}
              autoCapitalize="none"
              placeholderTextColor="#999"
              value={field.value}
              onChangeText={(text) => updateField(field.name, text)}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.googleButton3} onPress={handleSignup}>
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  inputcontainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  text1: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#057c97",
  },
  input: {
    width: 330,
    height: 55,
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#000000",
    backgroundColor: "transparent",
    paddingLeft: 15,
    color: "#000",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: 330,
    height: 55,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#000000",
    backgroundColor: "transparent",
    paddingRight: 15,
    marginTop: 18,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  googleButton3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fcb900",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 80,
    borderRadius: 20,
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});
