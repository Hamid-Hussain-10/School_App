import {
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
  Text,
} from "react-native";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Pressable onPress={() => router.push("/signup")}>
          <Text style={styles.text}>JOIN NOW</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: "80%",
    left: "35%",
  },
  text: {
    fontWeight: "600",
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 50,
    color: "white",
    backgroundColor: "#1D8B85",
  },
});
