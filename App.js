import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, View, Text } from "react-native";

import Quote from "./components/Quote";
import AddQuote from "./components/AddQuote";
import PrimaryButton from "./components/PrimaryButton";
import PrimaryIconButton from "./components/PrimaryIconButton";

const quotes = [
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: "Albert Einstein",
  },
  { text: "So many books, so little time.", author: "Frank Zappa" },
  {
    text: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero",
  },
  {
    text: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    author: "Bernard M. Baruch",
  },
];

export default function App() {
  // States
  const [index, setIndex] = useState(0);
  const [quotesList, setQuotesList] = useState(quotes);
  const [showAddQuote, setshowAddQuote] = useState(false);

  const quote = quotesList[index];

  let prevIndex = index - 1;
  if (prevIndex < 0) prevIndex = quotes.length - 1;

  function addQuoteToList(quoteText, name) {
    setshowAddQuote(false);
    const newQuotes = [...quotesList, { text: quoteText, author: name }];
    setQuotesList(newQuotes);
    setIndex(newQuotes.length - 1);
  }

  return (
    <View style={styles.container}>
      <PrimaryIconButton
        icon={"add-circle"}
        onPress={() => setshowAddQuote(true)}
        style={styles.newQuote}
      />

      <AddQuote
        visible={showAddQuote}
        onCancel={() => setshowAddQuote(false)}
        onSave={addQuoteToList}
      />

      <Quote body={quote} />

      <PrimaryButton
        title="Nächstes Zitat"
        onPress={() => setIndex((index + 1) % quotesList.length)}
        style={styles.next}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8",
    alignItems: "center",
    justifyContent: "center",
  },
  newQuote: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  next: {
    position: "absolute",
    bottom: 60,
  },
});
