// src/components/EmergencyCommunicationStyles.js
import { StyleSheet } from 'react-native';

export const emergencyCommunicationStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFCC00',
    marginBottom: 16,
  },
  contactInfo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    color: '#FFCC00',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FFCC00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageList: {
    marginTop: 16,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  messageDetails: {
    flex: 1,
    marginLeft: 10,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageType: {
    fontSize: 14,
    color: '#777',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});