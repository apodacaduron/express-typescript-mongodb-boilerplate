import { TFunction } from 'i18next';
import isEmpty from 'is-empty';
import Validator from 'validator';

import { IUser } from '../../../models/User';

interface IValidation {
  body: IUser;
  t: TFunction;
}

const validateSignUp = ({
  body: { name, lastName, email, password, passwordConfirm },
  t,
}: IValidation) => {
  const errors: Partial<IUser> = {};

  // Convert empty fields to an empty string so we can use validator functions
  name = !isEmpty(name) ? name : "";
  lastName = !isEmpty(lastName) ? lastName : "";
  // role = !isEmpty(role) ? role : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  passwordConfirm = !isEmpty(passwordConfirm) ? `${passwordConfirm}` : "";

  if (Validator.isEmpty(name)) {
    errors.name = t("validations.required", { value: t("strings.name") });
  }

  if (Validator.isEmpty(lastName)) {
    errors.lastName = t("validations.required", {
      value: t("strings.last_name"),
    });
  }

  if (Validator.isEmpty(email)) {
    errors.email = t("validations.required", { value: t("strings.email") });
  } else if (!Validator.isEmail(email)) {
    errors.email = t("validations.invalid", { value: t("strings.email") });
  }

  // if (Validator.isEmpty(role)) {
  //   errors.role = t("validations.required", { value: t("strings.role") });
  //   let idx = PRIVATE_ROLES.findIndex((e) => e === role);
  //   if (idx > -1) {
  //     errors.role = t("validations.invalid", { value: t("strings.role") });
  //   }
  //   idx = HP_ROLES.findIndex((e) => e === role);
  //   if (idx === -1) {
  //     errors.role = t("validations.invalid", { value: t("strings.role") });
  //   }
  // }

  if (Validator.isEmpty(password)) {
    errors.password = t("validations.required", {
      value: t("strings.password"),
    });
  } else if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = t("validations.min_length", {
      value: t("strings.password"),
      min: 6,
    });
  }

  if (Validator.isEmpty(passwordConfirm)) {
    errors.passwordConfirm = t("validations.required", {
      value: t("strings.confirm_password"),
    });
  }

  if (!Validator.equals(password, passwordConfirm)) {
    errors.passwordConfirm = t("validations.not_match", {
      value: t("strings.passwords"),
    });
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignUp;
