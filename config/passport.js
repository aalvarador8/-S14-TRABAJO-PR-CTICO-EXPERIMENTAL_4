const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Usuario = require("../models/Usuario");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const correo = profile.emails[0].value;

        let usuario = await Usuario.findOne({
          $or: [
            { googleId: profile.id },
            { correo: correo }
          ]
        });

        if (usuario) {
          if (!usuario.googleId) {
            usuario.googleId = profile.id;
            usuario.provider = "google";
            await usuario.save();
          }

          return done(null, usuario);
        }

        usuario = await Usuario.create({
          nombre: profile.displayName,
          correo: correo,
          googleId: profile.id,
          provider: "google"
        });

        done(null, usuario);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;