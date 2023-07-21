import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
// You can import from local files
import Task from './components/Task';
export default function App() {
  return (
    <View style={styles.container}>
        <Task />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
