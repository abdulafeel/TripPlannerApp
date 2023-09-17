import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'tripplan.db', location: 'default'});

// Create tables
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS trips (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, destination TEXT, startDate TEXT, endDate TEXT, userId TEXT)',
    [],
  );
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, tripId INTEGER, name TEXT, date TEXT, time TEXT, description TEXT, completed BOOLEAN)',
    [],
  );
});

export default db;
