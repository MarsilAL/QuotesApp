import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert } from "react-native";
import * as SQLite from "expo-sqlite";

import Quote from "./components/Quote";
import AddQuote from "./components/AddQuote";
import PrimaryButton from "./components/PrimaryButton";
import PrimaryIconButton from "./components/PrimaryIconButton";
import NoQuote from "./components/NoQuotes";

const database = SQLite.openDatabase("quotesAppData.db");

export default function App() {
  // States
  const [index, setIndex] = useState(0);
  const [quotesList, setQuotesList] = useState([]);
  const [showAddQuote, setshowAddQuote] = useState(false);
  useEffect(() => {
    initDB();
    loadQuotes();
  }, []);

  function initDB() {
    database.transaction((tx) =>
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY NOT NULL, text TEXT, author TEXT);"
      )
    );
  }

  function addQuoteToList(quoteText, name) {
    setshowAddQuote(false);
    const newQuotes = [...quotesList, { text: quoteText, author: name }];
    setQuotesList(newQuotes);
    setIndex(newQuotes.length - 1);
    saveQuotes(quoteText, name, newQuotes);
  }

  function deleteQuoteFromList() {
    const newQuotes = [...quotesList];
    const id = quotesList[index].id;
    newQuotes.splice(index, 1);
    setIndex(0);
    setQuotesList(newQuotes);
    database.transaction((tx) =>
      tx.executeSql("DELETE FROM quotes WHERE id=?", [id])
    );
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

  function saveQuotes(quoteText, name, newQuotes) {
    database.transaction((tx) =>
      tx.executeSql(
        "INSERT INTO quotes (text,author) VALUES(?,?)",
        [quoteText, name],
        (_, result) => {
          newQuotes[newQuotes.length - 1].id = result.insertId;
          setQuotesList(newQuotes);
        }
      )
    );
  }

  async function loadQuotes() {
    database.transaction((tx) =>
      tx.executeSql("SELECT * FROM quotes", [], (_, result) => {
        setQuotesList(result.rows._array);
      })
    );
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
