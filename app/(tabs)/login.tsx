import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function login() {
  const [pword, setPword] = useState('');
  const [email, setEmail] = useState('');

  let n = 0;

  async function debug(tag: String, str: String) {
    console.log(tag + "No. " + n.toString(), str);
    n++;
  }

  function loginA() {
    debug("loginA", "login: " + email + " password: " + pword + " success");
    // Add Firebase authentication logic here
  }

  return (
    <View style={styles.container}>
      {/* Welcome */}
      <ThemedText style={styles.title}>Welcome To FleetFeet</ThemedText>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        value={pword}
        onChangeText={setPword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={loginA}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Link to Home */}
      <Link href="/home" style={styles.link}>
        <ThemedText style={styles.linkText}>Go to Map for demonstration</ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e03424',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
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
  link: {
    marginTop: 20,
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});