import { Container, LoadIndicator } from "./styles";
import { StatusBar } from "expo-status-bar";

export function Loading() {
    return (

        <Container>
            <StatusBar style="light" backgroundColor={"#202024"} />
            <LoadIndicator/>
        </Container>
    )
}