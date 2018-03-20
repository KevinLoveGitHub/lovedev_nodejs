import passport from 'passport';
import passportLocal from 'passport-local';
import mongoose from 'mongoose';

const User = mongoose.model('User');

passport.use(new passportLocal.Strategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, (email, password, done) => {
  User.findOne({email: email}).then(function (user) {
    if (!user || !user.validPassword(password)) {
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));

