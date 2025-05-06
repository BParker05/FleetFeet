import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function Screen1() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Screen 1</ThemedText>
      <Link href="/screen2" style={styles.button}>
        <ThemedText type="subtitle">Screen2</ThemedText>
        <ThemedText type="link">Go to Screen 2</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#0a7ea4',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});