// src/screens/AuthScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../components/styles';
import { FIREBASE_AUTH } from '../../firebase/firebaseConfig';

const AuthScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isSignIn } = route.params || { isSignIn: true };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        navigation.navigate('Dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleAuthAction = async () => {
    setError(null);
    if (email === '' || password === '') {
      setError('Email and password are required');
      return;
    }

    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      } else {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      }
      navigation.navigate('Dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(FIREBASE_AUTH, provider);
      navigation.navigate('Dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.header}>{isSignIn ? 'Sign In' : 'Sign Up'}</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleAuthAction}>
        <Text style={styles.buttonText}>{isSignIn ? 'Sign In' : 'Sign Up'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(isSignIn ? 'SIGNUP' : 'LOGIN')}>
        <Text style={styles.toggleText}>
          {isSignIn ? 'Don’t have an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;