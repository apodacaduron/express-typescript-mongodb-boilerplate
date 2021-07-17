import { TFunction } from 'i18next';
import isEmpty from 'is-empty';
import Validator from 'validator';

import { IUser } from '../../../models/User';

interface IValidation {
  body: IUser;
  t: TFunction;
}

const validateSignUp = ({ body: { email, password }, t }: IValidation) => {
  const errors: Partial<IUser> = {};

  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  if (Validator.isEmpty(email)) {
    errors.email = t("validations.required", { value: t("strings.email") });
  } else if (!Validator.isEmail(email)) {
    errors.email = t("validations.invalid", { value: t("strings.email") });
  }

  if (Validator.isEmpty(password)) {
    errors.password = t("validations.required", {
      value: t("strings.password"),
    });
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignUp;
