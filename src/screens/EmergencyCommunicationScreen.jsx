// src/screens/EmergencyCommunicationScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { emergencyCommunicationStyles as styles } from '../components/EmergencyCommunicationStyles';
import { useRoute } from '@react-navigation/native';

const USER_UID = 'EBXIWpGdjiZ2zeY0YL06SCIbf9u2';

const EmergencyCommunication = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const contact = route.params?.contact;

  useEffect(() => {
    fetchMessages(USER_UID);
  }, []);

  const fetchMessages = async (uid) => {
    try {
      const response = await fetch(`http://localhost:3000/api/communication/recent?uid=${uid}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        const response = await fetch('http://localhost:3000/api/communication/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: USER_UID,
            message: message,
          }),
        });

        if (response.ok) {
          const newMessage = {
            id: Math.random().toString(),
            sender: 'You',
            type: message,
            time: 'just now',
            icon: 'message',
          };
          setMessages((prevMessages) => [newMessage, ...prevMessages]);
          setMessage('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageItem}>
      <MaterialIcons name={item.icon} size={24} color="#fbc02d" />
      <View style={styles.messageDetails}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.messageType}>{item.type}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
      <MaterialIcons name="attachment" size={20} color="#ccc" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Communication</Text>
      {contact && (
        <View style={styles.contactInfo}>
          <Text style={styles.label}>Communicating with: {contact.name}</Text>
        </View>
      )}
      <Text style={styles.label}>Send Message</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your message here"
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Recent Messages</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.messageList}
      />
    </View>
  );
};

export default EmergencyCommunication;