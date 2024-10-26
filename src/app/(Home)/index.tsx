import { StatusBar } from "expo-status-bar";

import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import Players from "@/screens/Players";
import { Loading } from "@/components/Loading";
import { ThemeProvider } from "styled-components";
import theme from "@/theme";


export default function Home() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
  <ThemeProvider theme={theme}> 
        <StatusBar style="light" backgroundColor="transparet" translucent/>
        {fontsLoaded ? <Players /> : <Loading />}
     </ThemeProvider>
  );
}