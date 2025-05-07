import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function Screen2() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Screen 2</ThemedText>
      <Link href="/screen1" style={styles.button}>
        <ThemedText type="subtitle">Screen1</ThemedText>
        <ThemedText type="link">Go to Screen 1</ThemedText>
      </Link>
      <Link href="/screen3" style={styles.button}>
        <ThemedText type="subtitle">Screen3</ThemedText>
        <ThemedText type="link">Go to Screen 3</ThemedText>
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