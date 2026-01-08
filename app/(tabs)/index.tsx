import { useAuth } from "@/lib/auth-context";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button onPress={signOut} icon={"logout"}>
        Sign Out
      </Button>
    </View>
  );
}
