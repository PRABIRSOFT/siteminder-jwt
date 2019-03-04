/*  define dependencies 
  - author  : Prabir Ghosh
  - mail    : mymail.prabir@gmail.com
  - website : https://twogp.com
*/

const jwt       = require('jsonwebtoken')

module.exports = {
  create: function (options, key) {
    var Tokenizer     = {}

    Tokenizer.options = options
    Tokenizer.key     = key 

    /*
      Method jwtSign ()
      - obj: claims object {}
      returns jwt token to application
    */
    Tokenizer.jwtSign = function (obj) {
      return jwt.sign(obj, Tokenizer.key, options)
    }

    /*
      Method jwtVerify ()
      - obj: token object {}
      returns claims token to application
    */
    Tokenizer.jwtVerify = function (obj) {
      return jwt.verify(obj, Tokenizer.key)
    }

    return Tokenizer
  }  
}
