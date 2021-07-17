import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(
  __dirname,
  process.env.NODE_ENV !== "testing" ? "../../../.env" : "../../.env"
);

dotenv.config({ path: envPath });
