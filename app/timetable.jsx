import { StyleSheet, Text,ScrollView } from 'react-native'

const timetable = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>Timetable</Text>
    </ScrollView>
  )
}

export default timetable

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})