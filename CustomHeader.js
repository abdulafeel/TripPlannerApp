import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import GlobalStyles from './GlobalStyles';
// Import icons library (you can use another library if preferred)

export default function CustomHeader({title, showBackButton = true}) {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity onPress={goBack}>
          {/* <Icon name="arrow-back-outline" size={24} color="white" /> */}
          <Text style={styles.backIcon}>{'<-'}</Text>
        </TouchableOpacity>
      )}
      <Text style={[GlobalStyles.text, styles.headerTitle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backIcon: {
    fontSize: 30,
  },
});
