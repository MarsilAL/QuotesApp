import { StyleSheet, Text, View } from "react-native";

export default function Quote({body}) {
    const {author, text} = body
  return (
    <View style={styles.container}>
      <Text style={styles.text}>“{text}”</Text>
    
      <Text style={styles.author}>&mdash; {author}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 2,
        margin: 2,
        width: "95 %"
    },
    text: {
        fontSize: 38,
        fontStyle: 'italic',
        color: 'darkslateblue',
        marginBottom: 20
    },
    author: {
        fontSize: 18,
        color: 'chocolate'
    }
})