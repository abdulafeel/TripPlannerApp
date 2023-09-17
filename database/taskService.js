import db from './database';

const insertTask = (tripId, name, date, time, description) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tasks (tripId, name, date, time, description, completed) VALUES (?, ?, ?, ?, ?, ?)',
        [tripId, name, date, time, description, 0], // 0 indicates the task is not completed initially
        (_, results) => {
          resolve(results.insertId);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};

const fetchTasksForTrip = tripId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tasks WHERE tripId = ?',
        [tripId],
        (_, results) => {
          const tasks = [];
          for (let i = 0; i < results.rows.length; i++) {
            tasks.push(results.rows.item(i));
          }
          resolve(tasks);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};

const updateTask = (taskId, completed) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        [completed, taskId],
        (_, results) => {
          if (results.rowsAffected > 0) {
            resolve(true); // Successfully updated
          } else {
            resolve(false); // Task not found or not updated
          }
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};

const deleteTask = taskId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM tasks WHERE id = ?',
        [taskId],
        (_, results) => {
          if (results.rowsAffected > 0) {
            resolve(true); // Successfully deleted
          } else {
            resolve(false); // Task not found or not deleted
          }
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};

export {insertTask, fetchTasksForTrip, deleteTask, updateTask};
