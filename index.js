/*  define dependencies 
  - author  : Prabir Ghosh
  - mail    : mymail.prabir@gmail.com
  - website : https://twogp.com
*/

const saml      = require('saml-encoder-decoder-js')
const saml20    = require('saml20')
const tokenizer = require('./src/tokenizer')

module.exports = {

  client: function (options) {

    CAClient = {}
    CAClient.jwt = new tokenizer.create(options.jwt, options.key)
    CAClient.options = options.ca

    /*
      Method login ()
      - response: CA SiteMinder Response
      - next: callback returns jwt token
    */

    CAClient.login = function (response, next) {
      const options      = CAClient.options
      saml.decodeSamlPost(decodeURIComponent(response), function (err, data) {
        if (err) {
          next(err)
        }
        saml20.validate(data, CAClient.options, function (err, profile) {        
          if (err) {
            next(err)
          } else {            
            const token = encodeURI(CAClient.jwt.jwtSign(profile))
            next(token)
          }
        })
      })
    },

    /*
      Method validate ()
      - token: request from the origin url
      - returns claims on success
    */  
    CAClient.validate = function (token) {
      try {
        const claims = CAClient.jwt.jwtVerify(decodeURI(token))      
        return claims
      } catch (err) {
        return err
      }
    }

    return CAClient
  }
}
