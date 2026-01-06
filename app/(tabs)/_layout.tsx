import { Tabs } from "expo-router";
import { GamepadIcon, HomeIcon, Lock } from "lucide-react-native";

export default function TapsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "coral" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <HomeIcon color={color} size={24} />
            ) : (
              <GamepadIcon color={color} size={24} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => <Lock color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
