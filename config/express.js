const express     = require('express')
    , bodyParser  = require('body-parser')
    , morgan      = require('morgan')
    , appRouter   = require('../app/routes/router')
    , jwt         = require('jsonwebtoken');

module.exports = () => {
  require('dotenv-safe').load({
    path: `${__dirname}/.env`,
    sample: `${__dirname}/.env.example`,
    allowEmptyValues: false
  });

  const app = express();
  const sroot = process.cwd();
  const spublic = '/public/';

  app.use(express.static(sroot + spublic));

  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.use( morgan('dev') );
  
  // Enables CORS
  app.use( ( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Max-Age', '86400');
    if ( req.method === 'OPTIONS' ) {
      res.header('Access-COntrol-Allow-Credentials', false);
    }
    next();
  });

  app.use( (req, res, next) => {
    res.locals.startEpoch = Date.now();
    next();
  });

  // Health Check API
  app.use( '/health/*', ( req, res ) => {
    const uptime = `${new Date() - startTime}ms`;
    res.status(200).json({ startTime, uptime });
  });
  
  //Valida se usuário está autenticado prosseguir com chamada da API
  app.use( ( req, res, next ) => {
    if ( ( req.url === '/v1/auth' || req.url === '/v1/register' ) && req.method === 'POST' ) {console.log("batata"); return next();} // it does not blocks authentication request
    if ( req.headers && req.headers.authorization ){
      jwt.verify( req.headers.authorization, process.env.JWT_SECRET, ( err, decode ) => {
        if ( err ) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      return res.status( 401 ).json( {message: 'Unauthorized'} );
    }
  });

  app.use('/v1', appRouter);

  app.use( '/*', ( req, res ) => {
    const uptime = `${new Date() - startTime}ms`;
    res.status(404).json({ startTime, uptime });
  });

  return app;
};