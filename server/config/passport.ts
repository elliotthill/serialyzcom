import passport from "passport"
import Strategies from "passport-local"
let LocalStrategy = Strategies.Strategy

import {models, sequelize} from "../models/index.js"
import {User} from "../models/user.js";
import bcrypt from "bcryptjs"

// Serialize Sessions
passport.serializeUser(function (user, done) {
    done(null, user)
})

//Deserialize Sessions
passport.deserializeUser(function (user: User, done) {
    models.User.findByPk(user.id)
        .then(function (user) {
            done(null, user)
        })
        .catch(function (err) {
            done(err, null)
        })
})

// Authentication
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        function (email, password, done) {
            models.User.findOne({where: {email: email}})
                .then((user) => {
                    if (!user) {
                        return done(null, false)
                    }

                    bcrypt.compare(password, user.password).then((success) => {
                        if (!success) return done(null, false)

                        return done(null, user)
                    })
                })
                .catch((err) => {
                    console.log(err)
                    return done(err)
                })
        }
    )
)

