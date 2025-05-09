import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, Text, StyleProp, ViewStyle  } from 'react-native';
import MapView, { Circle, PROVIDER_DEFAULT, Marker } from 'react-native-maps';


export default function Screen1() {
  const RADIUS = 300;

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

    // Reusable Button Component

  const CustomButton = ({ onPress, text, link , style = {} }) => {
    if (link) {
      return (
        <Link href={link} style={[styles.button, style]}>
          <Text style={styles.buttonText}>{text}</Text>
        </Link>
      );
    }

    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  // 
  return(
  <View style={styles.container}>
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

    <CustomButton text="START/STOP" onPress={() => console.log('Start/Stop pressed')} />
    <CustomButton text="Go to Screen 2" link="/screen2" />

    {/* <ThemedText style={styles.button}>START/STOP</ThemedText>

    <Link href="/screen2" style={styles.button}>
      <ThemedText style={styles.buttonText}>Go to Screen 2</ThemedText>
    </Link> */}

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
});