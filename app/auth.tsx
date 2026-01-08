import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

import { Button, Text, TextInput } from "react-native-paper";

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Pleas fill all the fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(null);

    if (isSignUp) {
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
    }

    router.replace("/");
  };

  const handleSwitchMode = () => {
    setIsSignUp((perv) => !perv);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="flex-1 p-4 justify-center">
        <Text style={stlye.title} variant="headlineLarge">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </Text>

        <TextInput
          label="Email"
          aria-label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="example@gmail.com"
          mode="outlined"
          style={stlye.input}
          onChangeText={setEmail}
        />

        <TextInput
          label="Password"
          aria-label="password"
          autoCapitalize="none"
          secureTextEntry
          placeholder="12345678"
          mode="outlined"
          style={stlye.input}
          onChangeText={setPassword}
        />

        {error && <Text className="text-rose-500!">{error}</Text>}

        <Button mode="contained" style={stlye.button} onPress={handleAuth}>
          {isSignUp ? "Sign Up" : "Sign in"}
        </Button>
        <Button
          mode="text"
          onPress={handleSwitchMode}
          style={stlye.switchModeButton}
        >
          {isSignUp
            ? "Do you already have an account? Sign in"
            : "No account no problem! sign up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const stlye = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
