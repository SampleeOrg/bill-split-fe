import TitleAuth from "@/components/AuthPage/TitleAuth";
import { COLOR } from "@/utils/color";
import { RelativePathString, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [emailInput, setEmailInput] = useState<string>("");

  return (
    <View className="gap-10">
      <TitleAuth
        title="Forgot password"
        desc="Please enter your email to reset password"
      />

      <TextInput
        label="Email"
        underlineColor={COLOR.primary2}
        textColor={COLOR.dark1}
        activeUnderlineColor={COLOR.dark1}
        style={{
          backgroundColor: COLOR.light3,
        }}
        value={emailInput}
        onChangeText={(email) => setEmailInput(email)}
      />

      <Button
        mode="contained"
        buttonColor={COLOR.dark1}
        onPress={() => router.push("/auth/otp" as RelativePathString)}
      >
        Reset Password
      </Button>
    </View>
  );
}
