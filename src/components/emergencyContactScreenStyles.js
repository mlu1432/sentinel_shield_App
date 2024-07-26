// src/components/emergencyContactScreenStyles.js
import { StyleSheet } from 'react-native';

export const emergencyContactScreenStyles = StyleSheet.create({
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
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactRelation: {
    fontSize: 14,
    color: '#777',
  },
  contactActions: {
    flexDirection: 'row',
  },
  actionText: {
    color: '#FFCC00',
    fontSize: 14,
    fontWeight: 'bold',
  },
});