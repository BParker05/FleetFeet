import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Home Screen</ThemedText>
      </ThemedView>
      <HelloWave />
      <Link href="/newScreen" style={styles.button}>
        <ThemedText type="subtitle">New Screen</ThemedText>
        <ThemedText type="link">Go to New Screen</ThemedText>
      </Link>
      <Link href="/screen1" style={styles.button}>
        <ThemedText type="subtitle">Screen1</ThemedText>
        <ThemedText type="link">Go to Screen 1</ThemedText>
      </Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
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
