import styled from '@emotion/styled';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import tw from 'tailwind.macro';

import { Color, Theme } from '../../theme';

/**
 *  TODO: Custom button functionality incomplete
 */

interface ButtonStyleProps {
    theme: Theme;
    color?: string;
    primary?: boolean;
}

// TODO - Button color.
const colorValue = (colorValue, colors) => {
    const color = colorValue.split('-');
    if (color[1] !== undefined) {
        return colors[color[0]][color[1]];
    }
    return color[0];
};

const color = props => {
    const { primary, secondary } = props.theme.colors;
    if (props.color) return colorValue(props.color, props.theme.colors);
    if (props.secondary) return secondary;
    return primary;
};

const ButtonStyles: any = styled.button`
    background-color: ${(p: ButtonStyleProps): string => color(p)};
    ${tw`hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-blue-500 my-4`}
    outline: none;
`;

interface ButtonProps {
    children?: ReactNode | string;
    color?: Color;
}

const Button: React.FunctionComponent<
    ButtonProps & ButtonHTMLAttributes<HTMLLabelElement>
> = (props: ButtonProps): JSX.Element => {
    const { children } = props;
    return <ButtonStyles {...props}>{children}</ButtonStyles>;
};

export default Button;
