import { StyleSheet, Text } from "react-native";

export default function NoQuote({}) {
  return <Text style={styles.NoQuote}> Keine Zitate</Text>;
}

const styles = StyleSheet.create({
  NoQuote: {
    fontSize: 38,
    fontStyle: "italic",
    color: "brown",
    marginBottom: 20,
  },
});
