import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Login = () => {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }
   
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Sign In</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.icon}
          />
          <Text style={styles.text}>with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton2}>
          <Image
            source={require("../../assets/images/facebook.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton2}>
          <Image
            source={require("../../assets/images/instagram.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.text3}>or with E-mail</Text>

      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Your E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { flex: 1, marginTop: 0 }]}
            placeholder="Password"
            secureTextEntry={secure}
            autoCapitalize="none"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
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
      </View>

      <TouchableOpacity>
        <Text style={styles.text4}>Forget password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton3} onPress={handleLogin}>
        <Text style={styles.text}> Get Started </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.text4}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  text1: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#057c97",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fcb900",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  googleButton2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#fcb900",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  text3: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 60,
  },
  inputcontainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  input: {
    width: 330,
    height: 55,
    marginTop: 20,
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
    marginTop: 20,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  googleButton3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fcb900",
    color: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 80,
    borderRadius: 20,
  },
  text4: {
    color: "#000",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 20,
    textDecorationLine: "underline",
    textDecorationColor: "black",
  },
});