import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme"
import { Navigation } from "./src/infrastructure/navigation";
import 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}
