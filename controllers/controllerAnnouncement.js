var database = require('../config/database');


const controller = {
    
    async getVersionHistory(){
      const title_id = 1;
      return new Promise((resolve, reject) => {
        database.query(`
          SELECT t.title, c.content 
          FROM titles t 
          JOIN contents c ON t.id = c.title_id 
          WHERE t.id = ?
          ORDER BY c.updated_at DESC 
          LIMIT 1;
      `, [title_id], (err, result, fields) => {
          if (err) {
            console.error('Error executing query:', err);
            return;
          }
          else{
            resolve(result);
          }
        });
      });
    }
};

module.exports = controller;