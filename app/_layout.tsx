import { DarkTheme, DefaultTheme, ThemeProvider} from "expo-router/react-navigation";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Library" }} />
        <Stack.Screen name="books" options={{ title: "Mina böcker" }} />
        <Stack.Screen name="add-book" options={{ title: "Lägg till bok" }} />
        <Stack.Screen name="item/[id]" options={{ title: "Detaljer" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
