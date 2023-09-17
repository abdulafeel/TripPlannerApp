// RecommendedPlaces.js

import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {fetchRecommendedPlaces} from './PlacesService';

export default function RecommendedPlaces({destination}) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Fetch recommended places when the component mounts
    fetchRecommendedPlaces(destination)
      .then(data => {
        setPlaces(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [destination]);

  return (
    <View>
      <Text>Recommended Places for {destination}</Text>
      <FlatList
        data={places}
        keyExtractor={item => item.place_id}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.formatted_address}</Text>
          </View>
        )}
      />
    </View>
  );
}
