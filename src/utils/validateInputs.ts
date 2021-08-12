import * as yup from 'yup';

type Schema = {
  name: string;
  email: string;
  password: string;
  phone?: string | number;
};

export const validateCreateClient = (data: Schema): Promise<boolean> =>
  yup
    .object()
    .shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        .required(),
      phone: yup
        .string()
        .min(11, 'Brazilian phone contains 11 chars. Eg. 11982257278')
        .max(11, 'Brazilian phone contains 11 chars. Eg. 11982257278'),
    })
    .isValid(data);

export const validateCreateProvider = (data: Schema): Promise<boolean> =>
  yup
    .object()
    .shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        .required(),
      phone: yup
        .string()
        .min(11, 'Brazilian phone contains 11 chars. Eg. 11982257278')
        .max(11, 'Brazilian phone contains 11 chars. Eg. 11982257278')
        .required(),
    })
    .isValid(data);

export const validateUpdateProfile = (data: Schema): Promise<boolean> =>
  yup
    .object()
    .shape({
      name: yup.string(),
      email: yup.string().email(),
      password: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
      phone: yup
        .string()
        .min(11, 'Brazilian phone contains 11 chars. Eg. 11982257278')
        .max(11, 'Brazilian phone contains 11 chars. Eg. 11982257278'),
    })
    .isValid(data);

export const validateAuth = (data: Schema): Promise<boolean> =>
  yup
    .object()
    .shape({
      email: yup.string().email().required('Email required!'),
      password: yup
        .string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        .required('Insert password - Should be 8 chars minimum.'),
    })
    .isValid(data);
