import '../utils/enviroment';

import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import User from '../models/User';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET ?? "secret",
};

const jwtStrategy = new Strategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    if (user) return done(null, user);

    return done(null, false);
  } catch (err) {
    console.log(err);
    return done(null, false);
  }
});

export default (passport: PassportStatic) => {
  passport.use(jwtStrategy);
};
