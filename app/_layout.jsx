import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007191",

        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
        },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="timetable" options={{ title: "Time Table" }} />
      <Stack.Screen name="homework" options={{ title: "Home Work" }} />
      <Stack.Screen name="result" options={{ title: "Result" }} />
      <Stack.Screen name="attendance" options={{ title: "Attendance" }} />
    </Stack>
  );
}
