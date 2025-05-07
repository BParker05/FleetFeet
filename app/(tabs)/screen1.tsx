import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Screen1() {
  const RADIUS = 300;

  const markers = [
    {
      coordinate: {
        latitude: -37.721077,
        longitude: 145.047977,
      },
      title: "Agora",
      description: "My Coffee",
    },
    {
      coordinate: {
        latitude: -37.721407,
        longitude: 145.046530,
      },
      title: "BethGleeson Building",
      description: "My course's building, fuck this place hah",
    },
  ];

  const renderMarkers = () => {
    return markers. map((marker, index) => (
      <Marker
        key={index}
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.description}
      />
    ))
  }
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Screen 1</ThemedText>
      <Link href="/screen2" style={styles.button}>
        <ThemedText style={styles.buttonText}>Go to Screen 2</ThemedText>
      </Link>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e03424',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },

  button: {
    marginTop: 20,
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