import { Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [loaded] = useFonts({
    inter: require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="events" />
    </Stack>
  );
}
