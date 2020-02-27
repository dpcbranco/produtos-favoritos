const mongoose   = require('mongoose')
    , jwt        = require('jsonwebtoken')
    , bcrypt     = require('bcrypt')
    , userSchema = require('../models/User') 
    , User       = mongoose.model('User', userSchema)

const _userLogon = ( req, res ) => {
  User.findOne({email: req.body.email})
    .then( user => {
      if ( !user ) return res.status(401).send({message:'Authentication failed. User not found.'});

      bcrypt.compare(req.body.pass, user.pass)
        .then( result => {
          if (!result) return res.status(401).send({ message:'Authentication failed. Invalid Password.' });
          
          const token = jwt.sign( { email: user.email }, process.env.JWT_SECRET, { expiresIn: 86400 } ); // Token expires in 24 hours
          return res.status(200).send({ token: token });
        })
        .catch( err => { return res.status(500).send({message: "Authentication failed",  error: err.message}) }); 
    })
    .catch( err => { return res.status(500).send({message: "Authentication failed",  error: err.message}) } ); 
};

const _userLogout = ( req, res ) => {
  res.status( 200 ).json( { message: 'Success' } );
};

const _userRegister = ( req, res ) => {
  User.findOne({email: req.body.email})
    .then( user => {
      if ( user ) return res.status(400).send({message: 'User already exists'} );
      
      bcrypt.hash( req.body.pass, 10 )
        .then( hash  => {
          const newUser = new User( req.body );
          newUser.pass = hash;
          newUser.save()
            .then( user => {
              user.pass = undefined;
              return res.json( user );
            })
            .catch( err => { return res.status(500).send({message: "Authentication failed",  error: err.message}) });
        })
        .catch( err => { return res.status(500).send({message: "Authentication failed",  error: err.message}) } );
    })
    .catch( err => { return res.status(500).send({message: "Authentication failed",  error: err.message}) } ); 
};

module.exports = {
    userLogon: _userLogon
  , userRegister: _userRegister
  , userLogout: _userLogout
};
