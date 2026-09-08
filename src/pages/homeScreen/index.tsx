import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import ProjectCard from "../../components/homeScreen";

const projects = [
  {
    id: "1",
    name: "Projeto BETO",
    progress: 70,
  },
  {
    id: "2",
    name: "Website institucional",
    progress: 45,
  },
  {
    id: "3",
    name: "Aplicativo mobile",
    progress: 25,
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >

      {/* Header */}

      <View style={styles.header}>

        <View>
          <Text style={styles.greeting}>
            Olá, Gabriel 👋
          </Text>

          <Text style={styles.subtitle}>
            Vamos colocar as coisas em dia?
          </Text>
        </View>

        <Pressable>
          <Ionicons
            name="notifications-outline"
            size={24}
          />
        </Pressable>

      </View>


      {/* Projetos */}

      <View style={styles.sectionHeader}>

        <Text style={styles.sectionTitle}>
          Meus projetos
        </Text>

        <Pressable>
          <Text style={styles.link}>
            Ver todos
          </Text>
        </Pressable>

      </View>


      {/* Cards */}

      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description="Projeto em andamento"
          progress={project.progress}
        />
      ))}


      {/* Botão */}

      <Pressable style={styles.createButton}>
        <Ionicons
          name="add"
          size={20}
        />

        <Text style={styles.createButtonText}>
          Criar projeto
        </Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F7F7F7",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  greeting: {
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  link: {
    fontSize: 14,
    fontWeight: "600",
  },

  createButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  createButtonText: {
    marginLeft: 8,
    fontWeight: "600",
  },

});