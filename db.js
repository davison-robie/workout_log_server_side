const Sequelize = require('sequelize')

const sequelize = new Sequelize('D-Robie-Workout-Log', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
  });

  sequelize.authenticate()
  .then(
      function() {
        console.log('Connected to the Workout Log postgres database');
      },
      function(err){
          console.log(err);
      }
  );
  module.exports = sequelize;