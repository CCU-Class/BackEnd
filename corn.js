const cron = require('node-cron');
const database = require('./config/database');

cron.schedule('0 0 * * *', () => {
  const query = `
    DELETE FROM course_table_save_file
    WHERE last_used_at < NOW() - INTERVAL 1 YEAR;
  `;

  database.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
    } else {
      console.log('Old records deleted:', results.affectedRows);
    }
  });
});
