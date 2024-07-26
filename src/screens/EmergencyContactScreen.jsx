// src/screens/EmergencyContactScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import * as Contacts from 'expo-contacts';
import { emergencyContactScreenStyles as styles } from '../components/emergencyContactScreenStyles';
import { useNavigation } from '@react-navigation/native';

const USER_UID = 'EBXIWpGdjiZ2zeY0YL06SCIbf9u2';

const EmergencyContactScreen = () => {
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        fetchContacts();
      }
    })();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
      });
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const renderContact = ({ item }) => (
    <View style={styles.contactContainer}>
      <View style={styles.contactInfo}>
        <Image source={require('../images/contact-icon.png')} style={styles.contactIcon} />
        <View>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactRelation}>{item.phoneNumbers ? item.phoneNumbers[0].number : 'No Number'}</Text>
        </View>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity onPress={() => navigation.navigate('EmergencyCommunication', { contact: item })}>
          <Text style={styles.actionText}>Communicate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default EmergencyContactScreen;