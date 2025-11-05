import TitleAuth from "@/components/AuthPage/TitleAuth";
import { COLOR } from "@/utils/color";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { Button } from "react-native-paper";

export default function OtpPage() {
  const router = useRouter();

  return (
    <View className="gap-10">
      <TitleAuth
        title="Check your email"
        desc="We sent an otp code to tuananhdeptrai@gmail.com Enter 5 digit code that mentioned in the email"
      />

      <OtpInput
        numberOfDigits={5}
        onTextChange={(text) => console.log(text)}
        focusColor={COLOR.primary3}
        theme={{
          pinCodeTextStyle: {
            fontFamily: "inter",
          },
        }}
        autoFocus={false}
      />

      <Button
        buttonColor={COLOR.dark1}
        textColor={COLOR.light1}
        onPress={() => router.push("/auth/new_password")}
      >
        Verify Code
      </Button>
    </View>
  );
}
