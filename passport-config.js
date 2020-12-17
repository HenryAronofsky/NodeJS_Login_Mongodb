const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/users')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        try {
            const theUser = await User.find({ userEmail: email })
            try {
                if (theUser[0].userEmail) {}
                if (await bcrypt.compare(password, theUser[0].userPassword)) {
                    return done(null, theUser)
                } else {
                    return done(null, false, { message: "Password Incorrect" })
                }
                return done()
            } catch (e) {
                return done(null, false, { message: "No User With That Email" })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => {
      return done(null, user)
    })
}

module.exports = initialize