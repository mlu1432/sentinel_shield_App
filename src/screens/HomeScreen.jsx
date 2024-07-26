// src/screens/HomeScreen.jsx
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, onAuthStateChanged } from '../../firebase/firebaseConfig';
import { styles } from '../components/styles';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        navigation.navigate('Dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };

  const handleSignup = () => {
    navigation.navigate('SIGNUP');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logoSmall} />
      <Text style={styles.header}>SentinelShield</Text>
      <Text style={styles.subtitle}>A Guardian in Your Pocket</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
