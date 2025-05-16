import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { auth, db } from '../../firebase';

export default function Screen2() {
  const [jogs, setJogs] = useState<{ date: string; time: string }[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const jogsRef = collection(db, 'users', user.uid, 'jogs');
    const q = query(jogsRef, orderBy('createdAt', 'desc'));

    // Listen for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jogsData = snapshot.docs.map(doc => ({
        date: doc.data().date,
        time: doc.data().time,
      }));
      setJogs(jogsData);
    });

    return unsubscribe; // Clean up listener on unmount
  }, []);

  return (

    // Main conatiner for background and such
    <View style={styles.container}>

      {/* Top container for the title and fake data */}
      <View style={styles.topContainer}>
        <ThemedText style={styles.title}>Jogging History</ThemedText>
        {jogs.length === 0 ? (
          <ThemedText style={styles.dataText}>No jogs yet.</ThemedText>
        ) : (
          jogs.map((entry, index) => (
            <ThemedText key={index} style={styles.dataText}>
              {entry.date} - {entry.time}
            </ThemedText>
          ))
        )}
      </View>

      {/* Bottom container for the button */}
      <View style={styles.bottomContainer}>
        <Link href="/home" style={styles.button}>
          <ThemedText style={styles.buttonText}>Go Home</ThemedText>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e03424',
    padding: 20,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 15,
    marginTop: 20,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  dataText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});