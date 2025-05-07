import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Circle, PROVIDER_DEFAULT, Marker } from 'react-native-maps';


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
    <ThemedView style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: -37.721,
          longitude: 145.046,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {renderMarkers()}
        <Circle
          center={{
            latitude: -37.721407,
            longitude: 145.046530,
          }}
          radius={200}
        />
      </MapView>


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
    justifyContent: 'flex-start',
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

  map:{
    flex: 1,
    width: '100%',
    height: '75%',
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
});