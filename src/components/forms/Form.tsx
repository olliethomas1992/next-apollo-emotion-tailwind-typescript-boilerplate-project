import { Form } from 'formik';
import React, { FormHTMLAttributes } from 'react';

interface FormProps {}

const CustomForm: React.FunctionComponent<
    FormProps & FormHTMLAttributes<FormProps>
> = (props: FormProps): JSX.Element => {
    return <Form {...props}></Form>;
};

export { CustomForm as default };
