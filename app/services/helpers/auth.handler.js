const jwt = require('jsonwebtoken');

const _validateRegister = async (req, res, next) => {
   
   const errors = []
   
   if (!req.body.email){
      errors.push("Missing registration e-mail");
   }

   if (!req.body.name){
      errors.push("Missing registration name");
   }

   if (!req.body.pass){
      errors.push("Missing password");
   }

   if (errors.length !== 0){
      return res.status(400).send(errors);
   }

   next();
}

const _logonRequired = ( req, res, next ) => {
   const token = req.headers.authorization;
 
   token ?
     jwt.verify( token, process.env.JWT_SECRET )
       .then( decode => {
         req.user = decode;
         next();
       })
       .catch( err => { return res.status(401).send({message: 'Invalid token'}) })
   :  res.status(401).send({message: 'Invalid token'});
 };

const _validateLogon = async (req, res, next) => {
   
   const errors = []
   
   if (!req.body.email){
      errors.push("Missing registration e-mail");
   }

   if (!req.body.pass){
      errors.push("Missing password");
   }

   if (errors.length !== 0){
      return res.status(400).send(errors);
   }

   next();
}

module.exports = {
   validateRegister: _validateRegister,
   validateLogon: _validateLogon,
   logonRequired: _logonRequired
}