import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Quote from "./components/Quote";
import AddQuote from "./components/AddQuote";
import PrimaryButton from "./components/PrimaryButton";
import PrimaryIconButton from "./components/PrimaryIconButton";
import NoQuote from "./components/NoQuotes";

export default function App() {
  // States
  const [index, setIndex] = useState(0);
  const [quotesList, setQuotesList] = useState([]);
  const [showAddQuote, setshowAddQuote] = useState(false);
  useEffect(() => {
    loadQuotes();
  }, []);

  function addQuoteToList(quoteText, name) {
    setshowAddQuote(false);
    const newQuotes = [...quotesList, { text: quoteText, author: name }];
    setQuotesList(newQuotes);
    setIndex(newQuotes.length - 1);
    saveQuotes(newQuotes);
  }

  function deleteQuoteFromList() {
    const newQuotes = [...quotesList];
    newQuotes.splice(index, 1);
    setIndex(0);
    setQuotesList(newQuotes);
    saveQuotes(newQuotes);
  }

  function confirmDeletion() {
    Alert.alert("Zitat löchecn", "Soll das Zitat wirklich gelöcht werden?", [
      { text: "Abbrechen", style: "cancel" },
      {
        text: "Bestätigen",
        style: "destructive",
        onPress: deleteQuoteFromList,
      },
    ]);
  }

  function saveQuotes(newQuotes) {
    AsyncStorage.setItem("QUOTES", JSON.stringify(newQuotes));
  }

  async function loadQuotes() {
    let quotesFromAS = await AsyncStorage.getItem("QUOTES");
    if (quotesFromAS !== null) {
      quotesFromAS = JSON.parse(quotesFromAS);
      setQuotesList(quotesFromAS);
    }
  }

  let content = <NoQuote />;
  if (quotesList.length > 0) {
    const quote = quotesList[index];
    content = <Quote body={quote} />;
  }

  return (
    <View style={styles.container}>
      {quotesList.length === 0 ? null : (
        <PrimaryIconButton
          icon={"delete"}
          onPress={() => confirmDeletion()}
          style={styles.deleteQuote}
        />
      )}

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

      {content}

      {quotesList.length < 2 ? null : (
        <PrimaryButton
          title="Nächstes Zitat"
          onPress={() => setIndex((index + 1) % quotesList.length)}
          style={styles.next}
        />
      )}

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
  deleteQuote: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  next: {
    position: "absolute",
    bottom: 60,
  },
});
