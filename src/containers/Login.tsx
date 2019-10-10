import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import Router, { useRouter } from 'next/router';
import Nprogress from 'nprogress';
import React, { ReactNode } from 'react';
import * as Yup from 'yup';

import { onFormFail, onFormSuccess } from '../components/forms/actions';
import LoginForm from '../components/forms/LoginForm';
import { FormCard } from '../components/styles/FormCard';
import { validateEmail, validatePassword } from '../helpers/validation';

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
            user {
                id
                name
                email
                password
            }
            token
        }
    }
`;

const Login = (): JSX.Element => {
    const [
        login,
        {
            loading,
            client: { resetStore }
        }
    ] = useMutation(LOGIN_MUTATION, {
        refetchQueries: ['CURRENT_USER_QUERY']
    });

    const router = useRouter();
    const { prevPage } = router.query;

    return (
        <FormCard>
            <h3>Login Up</h3>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object().shape({
                    email: validateEmail,
                    password: validatePassword
                })}
                onSubmit={(values, { setSubmitting, resetForm }): void => {
                    Nprogress.start();
                    resetStore();
                    login({ variables: values })
                        .then((): void => {
                            onFormSuccess({
                                setSubmitting,
                                resetForm
                            });
                            if (prevPage) {
                                Router.push({
                                    pathname: prevPage.toString()
                                });
                            }
                        })
                        .catch(({ graphQLErrors }): void => {
                            let errorMessage = '';
                            if (graphQLErrors[0].message.statusCode == 401) {
                                errorMessage = 'Invalid username or password';
                            } else {
                                console.log(
                                    JSON.stringify(graphQLErrors, null, 2)
                                );
                            }
                            onFormFail({
                                resetForm,
                                setSubmitting,
                                errorMessage
                            });
                        });
                }}
            >
                {({ errors, touched }): ReactNode => (
                    <LoginForm
                        errors={errors}
                        touched={touched}
                        loading={loading}
                    />
                )}
            </Formik>
        </FormCard>
    );
};

export { Login as default };
