// src/screens/DashboardScreen.jsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../components/styles';

const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SentinelShield</Text>
      <TouchableOpacity
        style={styles.sosButton}
        onPress={() => navigation.navigate('LocationSharing')}
      >
        <Text style={styles.sosButtonText}>Send SOS</Text>
      </TouchableOpacity>
      <View style={styles.emergencyContainer}>
        <Text style={styles.emergencyHeader}>Emergency Request Page</Text>
        <Text style={styles.emergencySubHeader}>Choose Emergency Type</Text>
        <View style={styles.emergencyTypes}>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={() => navigation.navigate('EmergencyCommunication')}
          >
            <Text style={styles.emergencyButtonText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={() => navigation.navigate('LocationSharing')}
          >
            <Text style={styles.emergencyButtonText}>Safety</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.actionButtonText}>Cancel Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.actionButtonText}>Send Request</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Real-time Location Sharing</Text>
        <Text style={styles.infoSubHeader}>Stay Connected in Emergency</Text>
        <View style={styles.infoItems}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('LocationSharing')}
          >
            <Text style={styles.actionButtonText}>Map Sharing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('EmergencyContact')}
          >
            <Text style={styles.actionButtonText}>Emergency Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashboardScreen;