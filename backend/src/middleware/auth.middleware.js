const ExtractJwt = require('passport-jwt').ExtractJwt
const StrategyJwt = require('passport-jwt').Strategy
const passport = require('passport')
const { JWTsecret } = require('../../config').api
const { findUserById } = require('../users/users.controllers')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: JWTsecret
}

passport.use(
    new StrategyJwt(options, (tokenDecoded, done) => {
        findUserById(tokenDecoded.id)
            .then(user => {
                if (user) {
                    done(null, tokenDecoded)
                } else {
                    done(null, false)
                }
            })
            .catch(err => {
                done(err, false)
            })
    })
)

module.exports = passport