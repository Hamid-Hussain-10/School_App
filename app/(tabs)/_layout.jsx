import { router, Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#000000",
        tabBarStyle: {
          backgroundColor: "#007191",
          height: 65,
          paddingVertical: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <AntDesign name="home" size={23} color={color} />
            ) : (
              <FontAwesome name="home" size={23} color="#000000" />
            );
          },
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={22}
              color="black"
              style={{ marginLeft: 15 }}
              onPress={() => router.back()}
            />
          ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="dashboard" size={23} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="signup"
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <AntDesign name="profile" size={23} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
