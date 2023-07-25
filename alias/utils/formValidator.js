import * as yup from 'yup';
import { formValidator } from '../constants';

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
    repeatPasswordMatch,
    ageReq,
    ageMin,
    ageMax,
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
      .required(repeatPasswordReq[language]),
    age: yup
      .number()
      .min(4, ageMin[language])
      .max(120, ageMax[language])
      .required(ageReq[language]),
  });
};

export default RegisterSchema;