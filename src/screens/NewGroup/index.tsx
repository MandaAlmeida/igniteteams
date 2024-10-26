import { Header } from "@/components/Header";
import { Container, Content, Icon } from "./styles";
import {Highlight} from "@/components/Highlight"
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useNavigation } from "expo-router";
import { useState } from "react";

export default function NewGroup(){
    const [group, setGroup] = useState("");
    const navigation = useNavigation();

    function handlePlayers(){
        navigation.navigate('players', {group})
    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon name="users"/>
                <Highlight
                title="Nova turma"
                subtitle="Crie a turma para adicionar as pessoas"
                />
                <Input
                placeholder="Nome da turma"
                onChangeText={setGroup}
                />
                <Button title="Criar" style={{marginTop: 20}} onPress={handlePlayers}/>
            </Content>
        </Container>
    )
}