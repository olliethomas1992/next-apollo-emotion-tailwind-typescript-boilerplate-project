import styled from '@emotion/styled';
import { Field as FormikField, GenericFieldHTMLAttributes } from 'formik';
import React from 'react';
import tw from 'tailwind.macro';

import { capitalize } from '../../helpers';
import Label from './Label';

const FieldStyles = styled.div`
    .input-info {
        ${tw`flex justify-between items-center my-2`}
    }

    label {
        margin: 0;
    }

    input {
        ${tw` h-10 p-2 rounded-lg bg-gray-200 border-none shadow mb-4 w-full`}
    }

    .error {
        ${tw` text-sm text-red-400 ml-10`}
    }
`;

interface FieldProps {
    labelText?: string;
    touched: boolean;
    error?: string;
}

const Field: React.FunctionComponent<
    FieldProps & GenericFieldHTMLAttributes
> = (props: FieldProps & GenericFieldHTMLAttributes): JSX.Element => {
    const { name, error, labelText } = props;
    const touched = Boolean(props.touched);
    return (
        <FieldStyles>
            <Label htmlFor={name} />
            <div className="input-info">
                <span className="label">{labelText || capitalize(name)}</span>
                <span className="error">{error && error}</span>
            </div>
            <FormikField {...props} touched={touched.toString()}></FormikField>
        </FieldStyles>
    );
};

export { Field as default };
