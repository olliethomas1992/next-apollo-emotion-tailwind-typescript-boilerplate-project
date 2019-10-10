import React from 'react';

import Button from '../buttons/Button';
import Field from './Field';
import Fieldset from './Fieldset';
import Form from './Form';
import { FormProps } from './types';

const SignUpForm = (props: FormProps): JSX.Element => {
    const { errors, touched, loading } = props;
    return (
        <Form method="POST">
            <Fieldset>
                <Field
                    type="text"
                    name="name"
                    error={errors.name}
                    touched={touched.name}
                />
                <Field
                    type="email"
                    name="email"
                    error={errors.email}
                    touched={touched.email}
                />
                <Field
                    type="password"
                    name="password"
                    error={errors.password}
                    touched={touched.password}
                />
                <Button disabled={loading} type="submit">
                    Submit
                </Button>
            </Fieldset>
        </Form>
    );
};

export { SignUpForm as default };
