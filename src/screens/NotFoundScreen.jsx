// src/screens/NotFoundScreen.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const NotFoundScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Page Not Found</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default NotFoundScreen;