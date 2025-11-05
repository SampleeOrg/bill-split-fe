import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {
  return (
    <SafeAreaView>
      <Text>Profile Page</Text>
      <Link href={"/"}>Home</Link>
    </SafeAreaView>
  );
}
