import { View, Text, Image, StyleSheet } from 'react-native';

const MarkSheetScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Mark Sheet</Text>
      <Image source={require('../assets/images/marksheet.png')} style={styles.image} />
    </View>
  );
};

export default MarkSheetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC300',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 500,
    borderRadius: 10,
  },
});
