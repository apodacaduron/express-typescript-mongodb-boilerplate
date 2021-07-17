// import { IUserModel } from './models/User';

declare global {
  // namespace Express {
  //   interface User extends IUserModel {}
  //   interface Response {
  //     sentry?: string;
  //   }
  // }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "testing" | "staging";
      DATABASE_URI: string;
      DATABASE_URI_TEST: string;
      JWT_SECRET: string;
      PORT?: string;
    }
  }
}
