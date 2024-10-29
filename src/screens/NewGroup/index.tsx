import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";

import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight"
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { groupCreate } from "@/storage/group/groupCreate";
import { AppError } from "@/utils/AppError";

import { Container, Content, Icon } from "./styles";

export default function NewGroup() {
    const [group, setGroup] = useState("");
    const navigation = useNavigation();

    async function handlePlayers() {
        try {
            if (group.trim().length === 0) {
                return Alert.alert("Novo Grupo", "Informe o nome da turma")
            }

            await groupCreate(group);
            navigation.navigate('players', { group });
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Novo Grupo", error.message)
            } else {
                Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo.")
                console.log(error)
            }

        }

    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon name="users" />
                <Highlight
                    title="Nova turma"
                    subtitle="Crie a turma para adicionar as pessoas"
                />
                <Input
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                />
                <Button title="Criar" style={{ marginTop: 20 }} onPress={handlePlayers} />
            </Content>
        </Container>
    )
}