import { ThemedText } from '@/components/ThemedText';
import * as Location from 'expo-location';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
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

  // User location state
  const [userLocation, setUserLocation] = useState<Region | null>(null);
  const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);

  // Request location permissions and start tracking
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to track your jogging route.');
        return;
      }

      // Get initial location
      const location = await Location.getCurrentPositionAsync({});
      const initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(initialRegion);
      setUserLocation(initialRegion);
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  // Start/Stop location tracking with timer
  useEffect(() => {
    if (isRunning) {
      // Start location tracking
      const startTracking = async () => {
        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            const newRegion = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setRegion(newRegion);
            setUserLocation(newRegion);
          }
        );
        setLocationSubscription(subscription);
      };

      startTracking();

      // Start timer
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    } else {
      // Stop location tracking
      if (locationSubscription) {
        locationSubscription.remove();
        setLocationSubscription(null);
      }
    }
  }, [isRunning]);

  // Format time function
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

  return (
    // Main conatiner for background and such
    <View style={styles.container}>

      {/* Timer display */}
      <ThemedText style={styles.timer}>{`Timer: ${formatTime(timer)}`}</ThemedText>

      {/* Map display */}
      <View style={styles.mapWrapper}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          region={region}
          showsUserLocation={true}
          followsUserLocation={true}
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

      {/* Start/Stop button */}
      <TouchableOpacity style={styles.button} onPress={toggleTimer}>
        <ThemedText style={styles.buttonText}>
          {isRunning ? 'STOP' : 'START'}
        </ThemedText>
      </TouchableOpacity>

      {/* Link to saved jogs screen */}
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