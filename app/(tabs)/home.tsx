import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';

export default function Screen1() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [region, setRegion] = useState<Region>({
    latitude: -37.721,
    longitude: 145.046,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [userLocation, setUserLocation] = useState<Region | null>(null);

  // Timer logic
  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval!);
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Toggle timer function
  const toggleTimer = () => {
    setIsRunning((prev) => {
      if (!prev) {
        setTimer(0);
      }
      return !prev;
    });
  };

  // Update region and user location when location changes
  const handleUserLocationChange = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setUserLocation({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.timer}>{`Timer: ${formatTime(timer)}`}</ThemedText>

      <View style={styles.mapWrapper}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          region={region} // Dynamically updated region
          onUserLocationChange={handleUserLocationChange}
          showsUserLocation={true} // Enable user location
          followsUserLocation={true} // Automatically follow user location
        >
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="You are here"
              description="Your current location"
            />
          )}
        </MapView>
      </View>

      <TouchableOpacity style={styles.button} onPress={toggleTimer}>
        <ThemedText style={styles.buttonText}>
          {isRunning ? 'STOP' : 'START'}
        </ThemedText>
      </TouchableOpacity>

      <Link href="/screen2" style={styles.button}>
        <ThemedText style={styles.buttonText}>Saved jogs</ThemedText>
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
  button: {
    padding: 10,
    backgroundColor: '#242424',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapWrapper: {
    width: '100%',
    height: '50%',
    borderRadius: 100,
    marginTop: 150,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    position: 'absolute',
    top: 20,
    marginTop: 50,
  },
});