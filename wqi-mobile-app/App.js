import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme"
import { Navigation } from "./src/infrastructure/navigation";
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Toast from 'react-native-toast-message';
import {
  useFonts as useNoto,
  NotoSans_400Regular,
  NotoSans_700Bold,
  NotoSans_400Regular_Italic
} from "@expo-google-fonts/noto-sans";

export default function App() {
  const [notoLoaeded] = useNoto({
    NotoSans_400Regular,
    NotoSans_700Bold,
    NotoSans_400Regular_Italic
  });

  if (!notoLoaeded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
      <StatusBar style="auto" />
      <Toast />
    </Provider>
  );
}
