import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

/**
 * @Desc Passport middleware
 */
export const authenticated = passport.authenticate("jwt", { session: false });

/**
 * @Desc Match role middleware
 */
// export const matchesRole = (roles: string[]) => (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.user?.role && roles.includes(req.user?.role)) {
//     next();
//   } else {
//     res.status(403).json({
//       message: req.t('strings.unauthorized'),
//       status: 403,
//     });
//   }
// };

/**
 * @Desc Doesnt match role middleware
 */
// export const excludeRole = (roles: string[]) => (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.user?.role && !roles.includes(req.user?.role)) {
//     next();
//   } else {
//     res.status(403).json({
//       message: req.t('strings.unauthorized'),
//       status: 403,
//     });
//   }
// };
