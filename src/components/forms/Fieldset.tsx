import styled from '@emotion/styled';
import React, { FieldsetHTMLAttributes, ReactNode } from 'react';
import tw from 'tailwind.macro';

const FieldsetStyles = styled.fieldset`
    ${tw` `};
    border: 0;
    padding: 0;
`;

interface FieldsetProps {
    children: ReactNode;
}

const Fieldset: React.FunctionComponent<
    FieldsetProps & FieldsetHTMLAttributes<HTMLFieldSetElement>
> = (props: FieldsetProps): JSX.Element => {
    const { children } = props;
    return <FieldsetStyles>{children}</FieldsetStyles>;
};

export { Fieldset as default };
