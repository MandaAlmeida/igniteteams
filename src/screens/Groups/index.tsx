import { useState, useCallback } from "react"

import { Header } from "@/components/Header";
import { Container } from "./styles";
import { Highlight } from "@/components/Highlight"
import { GroupCard } from "@/components/GroupCard";
import { FlatList } from "react-native";
import { ListEmpty } from "@/components/ListEmpty/index.";
import { Button } from "@/components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupGetAll } from "@/storage/group/groupsGetAll";


export default function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new")
  }

  async function featchGroups() {
    try {
      const data = await groupGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    featchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlight
        title="Turmas"
        subtitle="Jogue com a sua turma"
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (<GroupCard
          title={item}
        />)}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?" />}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
