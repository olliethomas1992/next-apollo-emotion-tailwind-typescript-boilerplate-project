import styled from '@emotion/styled';
import React, { LabelHTMLAttributes, ReactNode } from 'react';
import tw from 'tailwind.macro';

const LabelStyles = styled.label`
    ${tw` block mb-4 `};
`;

interface LabelProps {
    children: ReactNode;
}

const Label: React.FunctionComponent<LabelHTMLAttributes<HTMLLabelElement>> = (
    props: LabelProps
): JSX.Element => {
    const { children } = props;
    return <LabelStyles {...props}>{children}</LabelStyles>;
};

export { Label as default };
