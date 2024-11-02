import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";

import { Header } from "@/components/Header";
import { Highlight } from "@/components/Highlight";
import { ButtonIcon } from "@/components/ButtonIcon";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { PlayerCard } from "@/components/PlayerCard";
import { ListEmpty } from "@/components/ListEmpty/index.";
import { Button } from "@/components/Button";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { AppError } from "@/utils/AppError";
import { playerAddByGroup } from "@/storage/players/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@/storage/players/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@/storage/players/PlayerStorageDTO";
import { playerRemoveByGroup } from "@/storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "@/storage/group/groupRemoveByName";
import { Loading } from "@/components/Loading";

type RouteParams = {
    group: string
}

export default function Players() {
    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState("")
    const [team, setTeam] = useState("Time A");
    const [players, setPlayers] = useState<PlayerStorageDTO[]>();
    const navigation = useNavigation();

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null)

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert("Nova pessoa", "Informe nome da pessoa para adicionar");
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group);
            newPlayerNameInputRef.current?.blur();
            setNewPlayerName("");
            fetchPlayersByTeam();

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message)
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possivel adicionar')
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true)

            const playersByTeam = await playersGetByGroupAndTeam(group, team);

            setPlayers(playersByTeam);

        } catch (error) {
            console.log(error)
            Alert.alert("Pessoas", "Não foi possível carregar as pessoas do time selecionado");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            console.log(error)
            Alert.alert("Remover pessoa", "Não foi possivel remover essa pessoa.")
        }
    }

    async function removeGroup() {
        try {
            await groupRemoveByName(group);
            navigation.navigate("groups")

        } catch (error) {
            console.log(error)
            Alert.alert("Remover grupo", "Não foi possivel remover essa turma.")
        }
    }

    async function handleRemoveGroup() {
        Alert.alert("Remover", " Deseja remover essa turma?",
            [
                { text: "Não", style: "cancel" },
                { text: "Sim", onPress: () => removeGroup() }
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return (
        <Container>
            <Header showBackButton />

            <Highlight title={group} subtitle="Adicione a galera e separe os times" />

            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    inputRef={newPlayerNameInputRef}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon icon="add" onPress={handleAddPlayer} />
            </Form>
            <HeaderList>
                <FlatList
                    data={["Time A", "Time B"]}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumberOfPlayers>
                    {players?.length}
                </NumberOfPlayers>
            </HeaderList>
            {isLoading ? <Loading /> : <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => { handleRemovePlayer(item.name) }} />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message="Não há pessoas nesse time." />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{ paddingBottom: 100 },
                players?.length === 0 && { flex: 1 }
                ]}
            />}

            <Button
                title="Remover Turma"
                type="SECONDARY"
                onPress={handleRemoveGroup}
            />
        </Container>
    )
}