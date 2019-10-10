import styled from '@emotion/styled';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import tw from 'tailwind.macro';

const ButtonLinkStyles = styled.button`
    ${tw` text-gray-700 inline-block px-2 underline cursor-pointer bg-transparent border-none `};
`;

interface ButtonLinkProps {
    children: ReactNode;
}

const ButtonLink: React.FunctionComponent<
    ButtonLinkProps & ButtonHTMLAttributes<HTMLLabelElement>
> = (props: ButtonLinkProps): JSX.Element => {
    const { children } = props;
    return <ButtonLinkStyles {...props}>{children}</ButtonLinkStyles>;
};

export { ButtonLink as default };
