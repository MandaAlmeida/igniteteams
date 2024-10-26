

import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { Loading } from "@/components/Loading";
import { ThemeProvider } from "styled-components";
import theme from "@/theme";
import { Routes } from "@/routes";


export default function Home() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
  <ThemeProvider theme={theme}> 
        {fontsLoaded ? <Routes /> : <Loading />}
     </ThemeProvider>
  );
}