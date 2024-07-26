// src/screens/LocationSharingScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { styles } from '../components/styles';
import haversineDistance from '../utils/distanceUtils';

// src/screens/LocationSharingScreen.jsx

const LocationSharingScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setRegion] = useState(null);
    const [policeStations, setPoliceStations] = useState([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            setRegion({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });

            // Fetch nearby police stations from the backend
            const response = await fetch('http://localhost:3000/api/location/police-stations');
            const data = await response.json();
            setPoliceStations(data);
        })();
    }, []);

    const handleShareLocation = async () => {
        if (!location) return;

        try {
            const response = await fetch('http://localhost:3000/api/location/share', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: 'EBXIWpGdjiZ2zeY0YL06SCIbf9u2',
                    location: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                }),
            });
            const data = await response.json();
            if (data.success) {
                alert('Location shared successfully');
            }
        } catch (error) {
            console.error('Error sharing location:', error);
        }
    };

    const renderMarkers = () => {
        if (!location) return null;

        return policeStations.map(station => (
            <Marker
                key={station.id}
                coordinate={{
                    latitude: station.latitude,
                    longitude: station.longitude,
                }}
                title={station.name}
                description={`Distance: ${haversineDistance(location.coords, station).toFixed(2)} km`}
            />
        ));
    };

    if (errorMsg) {
        return (
            <View style={styles.locationSharingContainer}>
                <Text>{errorMsg}</Text>
            </View>
        );
    }

    if (!location) {
        return (
            <View style={styles.locationSharingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.locationSharingContainer}>
            <Text style={styles.locationSharingHeader}>Location Sharing</Text>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    region={region}
                    onRegionChangeComplete={setRegion}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Your Location"
                    />
                    {renderMarkers()}
                </MapView>
            </View>
            <View style={styles.userInfo}>
                <View style={styles.userPlaceholder}>
                    <Text style={styles.userPlaceholderText}>User</Text>
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.userName}>User Name</Text>
                    <Text style={styles.userStatus}>Location Update Status</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={handleShareLocation}>
                <Text style={styles.shareButtonText}>Share Location</Text>
            </TouchableOpacity>
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => {}}>
                    <Text style={styles.bottomButtonText}>Contacts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => {}}>
                    <Text style={styles.bottomButtonText}>Authorities</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LocationSharingScreen;