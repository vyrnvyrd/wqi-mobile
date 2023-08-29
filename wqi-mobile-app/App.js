import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme"
import { Navigation } from "./src/infrastructure/navigation";
import 'react-native-gesture-handler';
import {
  useFonts as useNoto,
  NotoSans_400Regular,
  NotoSans_700Bold
} from "@expo-google-fonts/noto-sans";

export default function App() {
  const [notoLoaeded] = useNoto({
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  if (!notoLoaeded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}
