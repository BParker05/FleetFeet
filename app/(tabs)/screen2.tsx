import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Screen2() {

  // Fake data for demonstration
  const fakeData = [
    { date: '03/05/25', time: '10:11' },
    { date: '04/05/25', time: '21:33' },
    { date: '05/05/25', time: '04:44' },
    { date: '06/05/25', time: '12:20' },
    { date: '07/05/25', time: '08:39' },
    { date: '08/05/25', time: '17:06' },
    { date: '09/05/25', time: '01:58' },
    { date: '10/05/25', time: '23:15' },
    { date: '11/05/25', time: '09:47' },
    { date: '12/05/25', time: '14:32' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ThemedText style={styles.title}>Jogging History</ThemedText>
        {fakeData.map((entry, index) => (
          <ThemedText key={index} style={styles.dataText}>
            {entry.date} - {entry.time}
          </ThemedText>
        ))}
      </View>
      <View style={styles.bottomContainer}>
        <Link href="/home" style={styles.button}>
          <ThemedText style={styles.buttonText}>Go Home</ThemedText>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e03424',
    padding: 20,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    marginTop: 20,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  dataText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#242424',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});