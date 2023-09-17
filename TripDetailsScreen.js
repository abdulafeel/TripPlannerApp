import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import GlobalStyles from './GlobalStyles';
import {fetchTripById} from './database/tripService';
import {
  fetchTasksForTrip,
  insertTask,
  updateTask,
  deleteTask,
} from './database/taskService';
import RecommendedPlaces from './RecommendedPlaces';
import {fetchRecommendedPlaces} from './PlacesService';

export default function TripDetailsScreen({route}) {
  const [trip, setTrip] = useState({});
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const {tripId, destination, startDate, endDate} = route.params;

  useEffect(() => {
    // Fetch the trip details and tasks when the component mounts
    fetchTripById(tripId)
      .then(tripData => setTrip(tripData))
      .catch(error => console.error('Error fetching trip details:', error));

    fetchTasksForTrip(tripId)
      .then(tasksData => setTasks(tasksData))
      .catch(error => console.error('Error fetching tasks:', error));
  }, [tripId]);

  useEffect(() => {
    // Fetch nearby places when the component mounts
    fetchRecommendedPlaces(destination).then(places => {
      setNearbyPlaces(places);
    });
  }, [destination]);

  const handleAddTask = () => {
    // Call your insertTask function to add a task to the database
    insertTask(trip.id, taskName)
      .then(newTaskId => {
        // Handle success, e.g., update the tasks list
        setTasks([
          ...tasks,
          {id: newTaskId, tripId: trip.id, name: taskName, completed: 0},
        ]);
        setTaskName(''); // Clear the task name input
      })
      .catch(error => {
        // Handle error, display an error message, etc.
        console.error('Error adding task:', error);
      });
  };

  const handleToggleComplete = taskId => {
    // Find the task by ID
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? {...task, completed: task.completed === 0 ? 1 : 0}
        : task,
    );

    // Display a confirmation dialog before updating the task
    Alert.alert(
      'Confirm Task Completion',
      'Are you sure you want to mark this task as complete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Mark Complete',
          onPress: () => {
            // Call your updateTask function to update the task's completed status
            updateTask(
              taskId,
              updatedTasks.find(task => task.id === taskId).completed,
            )
              .then(() => {
                // Handle success, e.g., update the tasks list
                setTasks(updatedTasks);
              })
              .catch(error => {
                // Handle error, display an error message, etc.
                console.error('Error updating task:', error);
              });
          },
        },
      ],
    );
  };

  const handleDeleteTask = taskId => {
    // Display a confirmation dialog before deleting the task
    Alert.alert(
      'Confirm Task Deletion',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Call your deleteTask function to delete the task from the database
            deleteTask(taskId)
              .then(() => {
                // Handle success, e.g., update the tasks list
                setTasks(tasks.filter(task => task.id !== taskId));
              })
              .catch(error => {
                // Handle error, display an error message, etc.
                console.error('Error deleting task:', error);
              });
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.label]}>Trip Name:</Text>
      <Text style={[styles.value, GlobalStyles.text]}>{trip.name}</Text>
      <Text style={[styles.label]}>Destination:</Text>
      <Text style={[styles.value, GlobalStyles.text]}>{trip.destination}</Text>
      <Text style={[styles.label]}>Tasks:</Text>
      {tasks.length === 0 ? (
        <Text style={[styles.emptyStateText, GlobalStyles.text]}>
          No tasks available. Add a task below.
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.taskItem}>
              <Text
                style={[
                  styles.taskName,
                  GlobalStyles.text,
                  item.completed === 1 && styles.completedTask,
                ]}
                accessibilityLabel={`Task: ${item.name}`}>
                {item.name}
              </Text>
              <Button
                title={
                  item.completed === 0 ? 'Mark Complete' : 'Mark Incomplete'
                }
                onPress={() => handleToggleComplete(item.id)}
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteTask(item.id)}
              />
            </View>
          )}
        />
      )}

      <Text style={[styles.subtitle]}>Nearby Attractions and Activities</Text>
      {nearbyPlaces.length === 0 ? (
        <Text style={[styles.emptyStateText, GlobalStyles.text]}>
          No nearby attractions available.
        </Text>
      ) : (
        <FlatList
          data={nearbyPlaces}
          keyExtractor={item => item.place_id}
          renderItem={({item}) => (
            <View style={styles.placeCard}>
              <Text style={[styles.place, GlobalStyles.text]}>{item.name}</Text>
            </View>
          )}
        />
      )}

      <Text style={[styles.label]}>Add Task:</Text>
      <TextInput
        placeholder="Enter task name"
        value={taskName}
        onChangeText={text => setTaskName(text)}
        style={[styles.taskInput, GlobalStyles.text]}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskName: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  emptyStateText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    marginTop: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  placeCard: {
    backgroundColor: 'black',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    padding: 16,
  },
  place: {
    fontSize: 16,
  },
  taskInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
