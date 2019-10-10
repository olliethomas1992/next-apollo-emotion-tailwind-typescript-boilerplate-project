import * as Yup from 'yup';

const validateEmail: Yup.StringSchema<string> = Yup.string()
    .email('Please enter a valid email')
    .required('Email is required');

const validateName: Yup.StringSchema<string> = Yup.string().required(
    'Name is required'
);

const validatePassword: Yup.StringSchema<string> = Yup.string().required(
    'Password is required'
);

export { validateEmail, validateName, validatePassword };
