import cors from 'cors';
import express, { Application, Response } from 'express';
import i18n from 'i18next';
import i18nFsBackend from 'i18next-fs-backend';
import i18nMiddleware from 'i18next-http-middleware';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';

import passportMiddleware from './middlewares/passport';
import { AuthRoutes } from './routes';

/**
 * Initializations
 */
const app: Application = express();

/**
 * Settings
 */
app.set("port", process.env.PORT || 5000);
i18n
  .use(i18nFsBackend)
  .use(i18nMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}/{{lng}}.json"),
    },
    fallbackLng: "es",
    preload: ["es", "en"],
  });

/**
 * Middlewares
 */
app.use(morgan("dev"));
app.use(cors());
app.use(i18nMiddleware.handle(i18n));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passportMiddleware(passport);

/**
 * Routes
 */
app.get("/", (_, res: Response) => {
  res.send(`The api is on port ${app.get("port")}`);
});
app.use("/api", AuthRoutes);

export default app;
