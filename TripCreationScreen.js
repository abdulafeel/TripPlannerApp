import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GlobalStyles from './GlobalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {insertTrip} from './database/tripService';

export default function TripCreationScreen({route}) {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const navigation = useNavigation();
  const {userId} = route.params;

  const handleSaveTrip = () => {
    // Perform validation here if needed
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // Call your insertTrip function to save the trip to the database
    insertTrip(name, destination, formattedStartDate, formattedEndDate, userId)
      .then(newTripId => {
        // Handle success, e.g., navigate to a different screen
        console.log('Trip created with ID:', newTripId);
        // Navigate to a different screen or reset form
        navigation.navigate('TripsList', {userId: userId});
      })
      .catch(error => {
        // Handle error, display an error message, etc.
        console.error('Error creating trip:', error);
      });
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const clearSelectedDates = () => {
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <View style={[styles.container, GlobalStyles.container]}>
      <Text style={[styles.title, GlobalStyles.text]}>Create a New Trip</Text>
      <TextInput
        style={styles.input}
        placeholder="Trip Name"
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        onChangeText={text => setDestination(text)}
      />
      <Text style={styles.label}>Start Date</Text>
      <Button title="Select Start Date" onPress={showStartDatePickerModal} />
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      <Text style={styles.label}>End Date</Text>
      <Button title="Select End Date" onPress={showEndDatePickerModal} />
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleEndDateChange}
        />
      )}
      <View style={styles.selectedDatesContainer}>
        {startDate.getTime() !== endDate.getTime() && (
          <TouchableOpacity onPress={clearSelectedDates}>
            <Text style={styles.clearDatesText}>Clear Dates</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.selectedDatesText}>
          Start Date: {formatDate(startDate)}
        </Text>
        <Text style={styles.selectedDatesText}>
          End Date: {formatDate(endDate)}
        </Text>
      </View>
      <Button title="Create Trip" onPress={handleSaveTrip} />
    </View>
  );
}

const formatDate = date => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 18,
    marginTop: 16,
  },
  selectedDatesContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  selectedDatesText: {
    fontSize: 18,
    marginBottom: 8,
  },
  clearDatesText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
});
