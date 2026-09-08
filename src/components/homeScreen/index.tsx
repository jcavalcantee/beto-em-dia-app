import { StyleSheet, Text, View } from "react-native";

interface ProjectCardProps {
  name: string;
  description: string;
  progress: number;
}

export default function ProjectCard({
  name,
  description,
  progress,
}: ProjectCardProps) {
  return (
    <View style={styles.card}>

      <Text style={styles.name}>
        {name}
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <Text style={styles.progress}>
        {progress}% concluído
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  description: {
    marginTop: 6,
    fontSize: 14,
  },

  progress: {
    marginTop: 12,
    fontSize: 13,
  },
});