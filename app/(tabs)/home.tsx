import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_DEFAULT } from 'react-native-maps';


export default function Screen1() {
  // variables
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // Track if the timer is running
  const RADIUS = 300;

  // Timer logic
  useEffect(() => {
    let interval: number | null = null; // Change type to 'number | null'
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

  // Format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // create markers and renderMarkers function
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
      description: "My course's building",
    },
  ];

  const renderMarkers = () => {
    return markers.map((marker, index) => (
      <Marker
        key={index}
        coordinate={marker.coordinate}
        title={marker.title}
        description={marker.description}
      />
    ));
  };

  // Toggle timer function
  const toggleTimer = () => {
    setIsRunning((prev) => {
      if (!prev) {
        // If starting the timer, reset it to 0
        setTimer(0);
      }
      return !prev;
    });
  };

  return (
  <View style={styles.container}>

    <ThemedText style={styles.timer}>{`Timer: ${formatTime(timer)}`}</ThemedText>
    
    <View style={styles.mapWrapper}>
      <MapView
        provider={PROVIDER_DEFAULT} // Map provider, google etc

        style={styles.map}
        initialRegion={{
          latitude: -37.721,
          longitude: 145.046,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {renderMarkers()}
        <Circle center= {{
          latitude: -37.721407,
          longitude: 145.046530,
        }} radius={200}>
        </Circle>
      </MapView>
    </View>

    <TouchableOpacity style={styles.button} onPress={toggleTimer}>
      <ThemedText style={styles.buttonText}>
        {isRunning ? "STOP" : "START"}
      </ThemedText>
    </TouchableOpacity>

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
    marginBottom: 0,
    marginTop: 10,
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

  // use mapWrapper to edit map's style
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