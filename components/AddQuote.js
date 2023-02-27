import { useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PrimaryButton from "./PrimaryButton";
import PrimaryIconButton from "./PrimaryIconButton";

export default function AddQuote({ visible, onCancel, onSave }) {
  const [name, setName] = useState('');
  const [quoteText, setQuoteText] = useState('');

  function caneclEditing() {
    onCancel();
    setQuoteText('');
    setName('');
  }

  function saveQuote() {
    if (
      (quoteText === null && name === null) ||
      (quoteText === "" && name === "")
    ) {
      alert("Inhalt und Name des Zitats dürfen nicht öeer sein");
    } else if (quoteText === null || quoteText === "") {
      alert("Inhalt des Zitats dürfen nicht öeer sein");
    } else if (name === null || name === "") {
      alert("Name des Zitats dürfen nicht öeer sein");
    } else {
      onSave(quoteText, name);
    }
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={caneclEditing}
      animationType="slide"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <PrimaryIconButton
          onPress={caneclEditing}
          icon="arrow-back"
          style={styles.backArrow}
        />
        <TextInput
          placeholder="Inhalt"
          multiline={true}
          onChangeText={setQuoteText}
          style={[styles.textInput, styles.textInputQuote]}
        />
        <TextInput
          placeholder="Name"
          returnKeyType="done"
          onChangeText={setName}
          onSubmitEditing={saveQuote}
          style={styles.textInput}
        />
        <PrimaryButton title="speicher" onPress={saveQuote} />
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignContent: "center",
    verticalAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  caneclBtn: {
    borderColor: "orangered",
    backgroundColor: "orangered",
    marginTop: 5,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
  },
  caneclBtnTxt: {
    color: "white",
  },
  textInput: {
    width: "80%",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "darkslateblue",
    borderRadius: 10,
  },
  textInputQuote: {
    height: 150,
    textAlignVertical: "top",
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 20,
  },
});
