import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import Nprogress from 'nprogress';
import React, { ReactNode } from 'react';
import * as Yup from 'yup';

import { onFormFail, onFormSuccess } from '../components/forms/actions';
import SignUpForm from '../components/forms/SignUpForm';
import { FormCard } from '../components/styles/FormCard';
import { errorHandler } from '../helpers/errorHandler';
import {
    validateEmail,
    validateName,
    validatePassword
} from '../helpers/validation';

const CREATE_USER_MUTATION = gql`
    mutation CREATE_USER_MUTATION(
        $name: String!
        $email: String!
        $password: String!
    ) {
        createUser(data: { name: $name, email: $email, password: $password }) {
            id
            name
            email
            password
        }
    }
`;

const SignUp = (): JSX.Element => {
    const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION);
    return (
        <FormCard>
            <h3>Sign Up</h3>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={Yup.object().shape({
                    name: validateName,
                    email: validateEmail,
                    password: validatePassword
                })}
                onSubmit={(values, { setSubmitting, resetForm }): void => {
                    Nprogress.start();
                    createUser({ variables: values })
                        .then((): void =>
                            onFormSuccess({ resetForm, setSubmitting })
                        )
                        .catch((errors): void => {
                            errorHandler({
                                errors,
                                expectedError: {
                                    code: 409
                                }
                            });
                            onFormFail({
                                resetForm,
                                setSubmitting
                            });
                        });
                }}
            >
                {({ errors, touched }): ReactNode => (
                    <SignUpForm
                        errors={errors}
                        touched={touched}
                        loading={loading}
                    />
                )}
            </Formik>
        </FormCard>
    );
};

export default SignUp;
