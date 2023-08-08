import * as yup from 'yup';
import { formValidator } from '../constants/formValidator';

const RegisterSchema = (language) => {
  const {
    usernameReq,
    usernameMin,
    emailReq,
    emailFormat,
    passwordFormat,
    passwordMin,
    passwordReq,
    repeatPasswordReq,
    repeatPasswordMatch
  } = formValidator;

  return yup.object({
    name: yup.string()
      .min(2, usernameMin[language])
      .required(usernameReq[language]),
    email: yup.string()
      .email(emailFormat[language])
      .required(emailReq[language]),
    password: yup
      .string()
      .min(8, passwordMin[language])
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/,
        passwordFormat[language]
      )
      .required(passwordReq[language]),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], repeatPasswordMatch[language])
      .required(repeatPasswordReq[language])
  });
};

const LoginSchema = (language) => {
  const {
    emailReq,
    emailFormat,
    passwordFormat,
    passwordMin,
    passwordReq,
  } = formValidator;

  return yup.object({
    email: yup.string()
      .email(emailFormat[language])
      .required(emailReq[language]),
    password: yup
      .string()
      .min(8, passwordMin[language])
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/,
        passwordFormat[language]
      )
      .required(passwordReq[language])
  });
};

const ChangePasswordSchema = (language) => {
  const {
    passwordFormat,
    passwordMin,
    passwordReq,
    repeatPasswordReq,
    repeatPasswordMatch
  } = formValidator;

  return yup.object({
    oldPassword: yup
      .string()
      .min(8, passwordMin[language])
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/,
        passwordFormat[language]
      )
      .required(passwordReq[language]),
    password: yup
      .string()
      .min(8, passwordMin[language])
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{8,}$/,
        passwordFormat[language]
      )
      .required(passwordReq[language]),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], repeatPasswordMatch[language])
      .required(repeatPasswordReq[language])
  });
};

export { RegisterSchema, LoginSchema, ChangePasswordSchema };