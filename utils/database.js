import SQLite from 'react-native-sqlite-storage';

// Open or create the database
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {name: 'productivity.db', location: 'default'},
      () => resolve(db),
      error => reject(error),
    );
  });
};

// Create table if it doesn't exist and add status column if not present
const initDatabase = async () => {
  try {
    const db = await openDatabase();
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS productivity (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          startTime TEXT NOT NULL,
          endTime TEXT NOT NULL,
          iconPath TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'incomplete'
        );`,
        [],
        () => console.log('Table created successfully'),
        error => console.log('Error creating table', error),
      );

      tx.executeSql(
        'PRAGMA table_info(productivity)',
        [],
        (_, {rows}) => {
          const statusColumnExists = rows
            .raw()
            .some(column => column.name === 'status');
          if (!statusColumnExists) {
            tx.executeSql(
              `ALTER TABLE productivity ADD COLUMN status TEXT NOT NULL DEFAULT 'incomplete';`,
              [],
              () => console.log('Status column added successfully'),
              error => console.log('Error adding status column', error),
            );
          }
        },
        error => console.log('Error checking table info', error),
      );
    });
  } catch (error) {
    console.error('Error initializing database', error);
  }
};

// Function to insert a new activity
const insertActivity = async (
  title,
  startTime,
  endTime,
  iconPath,
  status = 'incomplete',
) => {
  try {
    const db = await openDatabase();
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO productivity (title, startTime, endTime, iconPath, status) 
         VALUES (?, ?, ?, ?, ?);`,
        [title, startTime, endTime, iconPath, status],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log('Activity inserted successfully');
          } else {
            console.log('Failed to insert activity');
          }
        },
        error => console.log('Error inserting activity', error),
      );
    });
  } catch (error) {
    console.error('Error inserting activity', error);
  }
};

// Function to retrieve all entries from the productivity table
const getAllActivities = async () => {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM productivity;',
          [],
          (_, {rows}) => resolve(rows.raw()),
          error => {
            console.log('Error retrieving activities', error);
            reject([]);
          },
        );
      });
    });
  } catch (error) {
    console.error('Error retrieving activities', error);
    return [];
  }
};

// Function to update the status of an activity
const updateActivityStatus = async (id, newStatus) => {
  try {
    const db = await openDatabase();
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE productivity SET status = ? WHERE id = ?;`,
        [newStatus, id],
        (_, result) => {
          if (result.rowsAffected > 0) {
            console.log('Activity status updated successfully');
          } else {
            console.log('Failed to update activity status');
          }
        },
        error => console.log('Error updating activity status', error),
      );
    });
  } catch (error) {
    console.error('Error updating activity status', error);
  }
};

export {initDatabase, insertActivity, getAllActivities, updateActivityStatus};
