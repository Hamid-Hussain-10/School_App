import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";

const Dashboard = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/dbg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.dashimg}>
        <FontAwesome name="graduation-cap" size={70} color="#000000" />
        <Text style={styles.imgpara}> FG Boys </Text>
      </View>
      <View style={styles.dashtext}>
        <Text style={styles.imgtext}> Student Panel </Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={{ ...styles.div, backgroundColor: "#4644A9" }}
          onPress={() => router.push("/timetable")}
        >
          <FontAwesome name="calendar" size={45} color="#ffffff" />
          <Text style={styles.para}>Time Table</Text>
          <Text style={styles.spara}>school app</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.div, backgroundColor: "#2E8B57" }}
          onPress={() => router.push("/homework")}
        >
          <FontAwesome name="book" size={45} color="#ffffff" />
          <Text style={styles.para}>Home Work</Text>
          <Text style={styles.spara}>3 pending...</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.div, backgroundColor: "#D2691E" }}
          onPress={() => router.push("/result")}
        >
          <FontAwesome name="bar-chart" size={45} color="#ffffff" />
          <Text style={styles.para}>Result</Text>
          <Text style={styles.spara}>3.2 CGPA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.div, backgroundColor: "#1E90FF" }}
          onPress={() => router.push("/attendance")}
        >
          <FontAwesome name="check-square" size={45} color="#ffffff" />
          <Text style={styles.para}>Attendance</Text>
          <Text style={styles.spara}>Full</Text>
        </TouchableOpacity>
         <Image
      source={require("../../assets/images/dashimg.png")}
      style={styles.dashimage}
      resizeMode="contain"
    />
      </View>
    </ImageBackground>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 100,
    position: "relative",
    top: 100,
  },
  div: {
    backgroundColor: "#4644A9",
    padding: 20,
    borderRadius: 40,
    borderBottomEndRadius: 0,
    width: "42%",
    height: "23%",
  },
  para: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 8,
    color: "#ffffff",
  },
  spara: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 5,
    color: "#000000",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  dashimg: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 80,
    left: 30,
    zIndex: 1,
  },
  imgpara: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 8,
    color: "#000000",
  },
  dashtext: {
    position: "absolute",
    top: 150,
    left: 30,
    zIndex: 1,
  },
  imgtext: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
  },
  dashimage: {
    width : '100%',
    height: '40%',
  },
});
