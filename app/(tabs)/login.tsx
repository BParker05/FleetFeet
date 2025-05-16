import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';

export default function Login() {
  {/* Variables */}
  const [pword, setPword] = useState('');
  const [email, setEmail] = useState('');
  const [loginStatus, setLoginStatus] = useState(''); // Replace setloginout

  {/* Debug function */}
  let n = 0;
  async function debug(tag: string, str: string) {
    console.log(`${tag} No. ${n}`, str);
    n++;
  }

  {/* Login handler */}
  function loginA() {
    signInWithEmailAndPassword(auth, email, pword)
      .then((userCredential) => {
        const user = userCredential.user;
        debug('Login Success: ', user.email || 'No Email');
        setLoginStatus(`Login: ${user.email}`);
        router.replace('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        debug('Login Error: ', errorMessage);
        setLoginStatus(`Login Error: ${errorMessage}`);
      });
  }

  {/* Sign Up handler */}
  function signUpA() {
    createUserWithEmailAndPassword(auth, email, pword)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoginStatus(`Sign Up Success: ${user.email}`);
        router.replace('/home');
      })
      .catch((error) => {
        setLoginStatus(`Sign Up Error: ${error.message}`);
      });
  }

  return (
    // Main container for background and such
    <View style={styles.container}>

      <Text style={styles.title}>Welcome To FleetFeet</Text>

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

      {/* Sign Up Button */}
      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={signUpA}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
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
  statusText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
});