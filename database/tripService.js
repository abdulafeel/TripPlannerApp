import db from './database';
import {auth} from '../firebase';
const insertTrip = (name, destination, startDate, endDate, userId) => {
  // const userId = auth.currentUser.uid;
  // console.log('MAIN', userId);
  // if (!userId) {
  //   return Promise.reject(new Error('User not logged in.'));
  // }

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO trips (name, destination, startDate, endDate, userId) VALUES (?, ?, ?, ?, ?)',
        [name, destination, startDate, endDate, userId],
        (_, results) => {
          resolve(results.insertId);
        },
        (_, error) => {
          console.error('Database error:', error);
          reject(error);
        },
      );
    });
  });
};

const fetchTrips = userId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM trips WHERE userId=?',
        [userId],
        (_, results) => {
          const trips = [];
          for (let i = 0; i < results.rows.length; i++) {
            trips.push(results.rows.item(i));
          }
          resolve(trips);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};

const fetchTripById = tripId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM trips WHERE id = ?',
        [tripId],
        (_, results) => {
          if (results.rows.length === 1) {
            resolve(results.rows.item(0));
          } else {
            resolve(null); // Trip not found
          }
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};

export {insertTrip, fetchTrips, fetchTripById};
