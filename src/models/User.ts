import bcrypt from 'bcrypt';
import { Document, model, Model, Schema } from 'mongoose';

import { useColor } from '../utils/composable';

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  color: string;
  roles: string[];
  confirmation_code: string;
  confirmed: boolean;
  facebook: {
    id: string;
    token: string;
    email: string;
    name: string;
  };
  google: {
    id: string;
    token: string;
    email: string;
    name: string;
  };
  comparePassword: (password: string) => Promise<boolean>;
}

/**
 * Schema
 */
const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  roles: [String],
  confirmation_code: String,
  confirmed: { type: Boolean, default: false },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
});

/**
 * Encrypt password
 */
userSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

/**
 * Compare password
 */
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Set user color
 */
userSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (!user.isModified("color")) return next();

  const { color } = useColor();
  user.color = color;
  next();
});

export default model<IUser>("User", userSchema);
