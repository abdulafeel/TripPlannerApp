// TripsListScreen.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import GlobalStyles from './GlobalStyles';
import {fetchTrips} from './database/tripService';

export default function TripsListScreen({navigation, route}) {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = route.params.userId;
    fetchTrips(userId)
      .then(data => {
        setTrips(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleTripPress = trip => {
    navigation.navigate('TripDetails', {
      tripId: trip.id,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, GlobalStyles.container]}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={GlobalStyles.text}>Loading trips...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, GlobalStyles.container]}>
        <Text style={[styles.title, GlobalStyles.text]}>Trips</Text>
        <Text style={[GlobalStyles.text, styles.errorText]}>
          Error: {error.message}
        </Text>
      </View>
    );
  }
  if (trips.length === 0) {
    return (
      <View style={[styles.container, GlobalStyles.container]}>
        <Text style={[styles.title, GlobalStyles.text]}>Trips</Text>
        <Text style={[GlobalStyles.text, styles.emptyStateText]}>
          No trips available.
        </Text>
      </View>
    );
  }
  return (
    <View style={[styles.container, GlobalStyles.container]}>
      <FlatList
        data={trips}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleTripPress(item)}
            style={styles.tripCard}>
            <View style={styles.tripItem}>
              <Text style={[GlobalStyles.text, styles.tripName]}>
                Trip Name: {item.name}
              </Text>
              <Text style={[styles.destination]}>
                Destination: {item.destination}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  tripItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  errorText: {
    color: 'red',
    marginTop: 16, // Add spacing between error message and other content
  },
  emptyStateText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 16, // Add spacing between empty state message and other content
  },
  tripCard: {
    backgroundColor: 'black',
    borderRadius: 8,
    elevation: 2, // Add elevation (shadow) to provide a sense of depth
    marginBottom: 16, // Add spacing between trip cards
  },
  tripName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8, // Add spacing between label and trip name
  },
  destination: {
    fontSize: 14,
  },
});
