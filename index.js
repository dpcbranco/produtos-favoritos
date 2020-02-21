const app = require('./config/express')();

require('./config/database')( process.env.DB_URI );

app.listen( process.env.PORT, () => {
  console.log('Server listening at %s ', process.env.PORT);
});


module.exports = app;