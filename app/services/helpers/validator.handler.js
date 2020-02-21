const _emailValidator = async (req, res, next) => {
   
   const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   if (!req.body.email.match(regexEmail)){
      return res.send({message: "Invalid e-mail address"}).status(400);
   }

   next();
}

module.exports = {
   emailValidator: _emailValidator
} 