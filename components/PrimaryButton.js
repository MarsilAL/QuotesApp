import { StyleSheet, Pressable, Text } from "react-native";

export default function PrimaryButton({ onPress, title, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.primaryButton, style]}>
      <Text style={styles.primaryButtonTitle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    borderColor: "darkslateblue",
    backgroundColor: "darkslateblue",
  },
  primaryButtonTitle: {
    color: "#FFFFFF",
  },
});
