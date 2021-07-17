import '../utils/enviroment';

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';
import { validateSignIn, validateSignUp } from './validators/auth';

/**
 * Create token from user
 * @param user
 */
const createToken = (user: IUser) => {
  const jwtPayload = {
    id: user.id,
    email: user.email,
  };

  const jwtSecret = process.env.JWT_SECRET || "secret";

  return jwt.sign(jwtPayload, jwtSecret);
};

/**
 * Sign up
 * @param req
 * @param res
 * @returns user
 */
export const signUp = async (req: Request, res: Response) => {
  const { errors, isValid } = validateSignUp(req);

  if (!isValid) return res.status(400).json(errors);

  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email }).select("-password");

    if (userExists)
      return res.status(409).json({ email: req.t("auth.email_taken") });

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

/**
 * Sign in
 * @param req
 * @param res
 * @returns signed user with token
 */
export const signIn = async (req: Request, res: Response) => {
  const { errors, isValid } = validateSignIn(req);

  if (!isValid) return res.status(400).json(errors);

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        errors: { invalidCredentials: req.t("auth.invalid_credentials") },
      });

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      return res.status(400).json({
        errors: { invalidCredentials: req.t("auth.invalid_credentials") },
      });

    res.status(200).json({ token: createToken(user) });
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};
