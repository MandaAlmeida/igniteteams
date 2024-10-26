import { View } from "react-native";
import { NavigationContainer} from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { AppRoutes } from "./app.routes";

import { StatusBar } from "expo-status-bar";


export function Routes(){
    const { COLORS } = useTheme();

    return(
        <View style={{flex: 1, backgroundColor: COLORS.GRAY_600}}>
        <NavigationContainer independent={true}>
            <StatusBar style="light" backgroundColor={COLORS.GRAY_600}  translucent/>
             <AppRoutes/>
      </NavigationContainer>
      </View>
      
       
    );
}